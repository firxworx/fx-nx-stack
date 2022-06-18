import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '../src/generated/prisma-client' // note: default configuration imports from '@prisma/client'

/**
 * NestJS service that wraps the Prisma database client.
 *
 * @see {@link https://docs.nestjs.com/recipes/prisma}
 * @see {@link https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nestjs/src}
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
