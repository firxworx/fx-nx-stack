import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'

import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import compression from 'compression'

import { AppModule } from './app.module'
import { AppConfig } from './config/types/app-config.interface'
import { useContainer } from 'class-validator'
import { NestExpressApplication } from '@nestjs/platform-express'
import { PrismaService } from './prisma.service'

async function bootstrap(): Promise<NestExpressApplication> {
  const logger = new Logger('main')

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['log', 'error', 'warn'],
  })

  const configService = app.get<ConfigService>(ConfigService)
  const appConfig = configService.get<AppConfig>('app')

  if (!appConfig) {
    throw new Error('Error resolving app config (undefined)')
  }

  // set global prefix (base uri the api server will listen on)
  const globalPrefixValue = `${appConfig.basePath}/${appConfig.apiVersion}`
  app.setGlobalPrefix(globalPrefixValue)

  // enable class-validator to use classes via NestJS direct injection (DI)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // ensure provider `onApplicationShutdown()` hooks are called if process receives a shutdown signal (also important for healthchecks)
  app.enableShutdownHooks()

  // prevent prisma from interfering w/ nestjs shutdown hooks by adding a listener for prisma onExit event (refer to nestjs docs on prisma)
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  // configure ClassSerializerInterceptor to serialize dto/entity classes returned as responses to json
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // configure ValidationPipe to process incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip validated object of properties that do not have validation decorators in the entity/dto
      transform: true, // enable class-transformer to transform plain objects into classes via `plainToClass()` (use in conjuction with `@Type()` decorator)
      transformOptions: {
        enableImplicitConversion: false,
      },
      forbidNonWhitelisted: true, // throw if an unrecognized property is received
      forbidUnknownValues: true, // recommended per class-validator npm page
      // disableErrorMessages: true, // consider making an env config option: may want to disable verbose errors in production
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) =>
        new UnprocessableEntityException({
          message: 'Unprocessable Entity',
          errors: errors.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.property]: Object.values(curr.constraints ?? {}).join(', '),
            }),
            {},
          ),
        }),
    }),
  )

  // enable cors for the api (note: including credentials is important for auth cookies)
  app.enableCors({
    origin: appConfig.origin,
    credentials: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders: ...
  })

  // enable express middleware that populates `req.cookies`
  app.use(cookieParser.default())

  // conditionally enable express middleware for compression
  if (appConfig.express.compression) {
    logger.log('enabling compression via express middleware')
    app.use(compression())
  }

  // conditionally enable express trust proxy behaviour (trust X-Forwarded-* headers)
  if (appConfig.express.trustProxy) {
    logger.log('enabling express trust proxy setting')
    app.enable('trust proxy')
  }

  // helmet sets common http headers that improve security
  app.use(helmet())

  const httpServer = await app.listen(appConfig.port, () => {
    logger.log(`🚀 Application environment: <${process.env.NODE_ENV}>`)
    logger.log(`🚀 Application listening on port <${appConfig.port}> at path <${globalPrefixValue}>`)
    logger.log(`🚀 Accepting requests from origin: <${appConfig.origin}>`)
  })

  const url = await app.getUrl()
  logger.log(`🚀 Application URL: <${url}>`)

  return httpServer
}

try {
  bootstrap()
} catch (error: unknown) {
  console.error((error instanceof Error && error.message) || String(error))
  console.error((error instanceof Error && error.stack) || '---')
}
