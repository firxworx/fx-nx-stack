import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import appConfig from './config/app.config'
import authConfig from './config/auth.config'
import databaseConfig from './config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
