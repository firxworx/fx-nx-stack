import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import appConfig from './config/app.config'
import authConfig from './config/auth.config'
import databaseConfig from './config/database.config'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseModule } from './modules/database/database.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
