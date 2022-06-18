import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma.module'
import { DatabaseModule } from '../database/database.module'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
