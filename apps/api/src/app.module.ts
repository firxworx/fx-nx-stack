import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'

import appConfig from './config/app.config'
import authConfig from './config/auth.config'
// import databaseConfig from './config/database.config'
import { AnyExceptionFilter } from './filters/any-exception.filter'
import { AuthModule } from './modules/auth/auth.module'
// import { DatabaseModule } from './modules/database/database.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig], // databaseConfig
    }),
    // DatabaseModule,
    // AuthModule,
    // UsersModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AnyExceptionFilter }, PrismaService],
})
export class AppModule {}
