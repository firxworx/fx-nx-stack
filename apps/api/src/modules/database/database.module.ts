import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import ormconfig from '../../ormconfig'
import { QueryUtilsService } from './query-utils.service'

/**
 * Load typeorm-compatible ormconfig and specify additional options specific to @nestjs/typeorm.
 */
const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...ormconfig,
  autoLoadEntities: true,
}

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleOptions)],
  exports: [QueryUtilsService],
  providers: [QueryUtilsService],
})
export class DatabaseModule {}
