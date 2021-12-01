import * as dotenv from 'dotenv'
import { resolve, join } from 'path'

import type { ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from './modules/database/snake-naming.strategy'

/**
 * dotenv is used directly to load environment vars from .env to support standalone usage with the typeorm cli.
 *
 * This file works independently of nestjs + its DI environment; if nestjs/config were used to house the
 * typeorm config then it would require the nestjs app to access it.
 *
 * Note that the @nestjs/config package uses dotenv under the hood.
 *
 * Refer to `package.json` where this file is passed via `--config` flag to the `typeorm` script.
 */
dotenv.config({ path: resolve(process.cwd(), '.env') })

/**
 * Export TypeORM config `ConnectionOptions`.
 *
 * This file will _not_ be automatically detected and read in by the typeorm cli because it resides in `src/` vs. project root.
 * This arrangement does not risk altering the paths of the compiled `dist/` folder when using a typical `tsconfig.json` per nx and/or nestjs.
 *
 * Migrations that reside under `src/` (`./src/modules/database/migrations`) will be compiled to `dist/` folder.
 *
 * In an nx monorepo, the default webpack configuration will compile the entire nestjs app into a single js file.
 * This breaks the assumptions of typeorm which assumes that each migration is stored in its own dedicated js file in the dist folder.
 *
 * Reminder: static glob paths in the following configuration will not work with webpack and hence nx.
 * This is is mitigated by leveraging NestJS' `autoLoadEntities()` feature instead of glob paths.
 *
 * @see DatabaseModule
 * @see {@link https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md}
 * @see {@link https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md}
 * @see {@link https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md}
 */
const ormconfig: ConnectionOptions = {
  type: 'postgres' as const, // cast is required for appropriate typing (e.g. 'postgres' as 'postgres')
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  database: process.env.DB_DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  namingStrategy: new SnakeNamingStrategy(),

  // automatically run migrations every time the app is launched
  migrationsRun: true,

  // entity classes correspond to database tables
  entities: ['dist/**/*.entity.js'],

  // subscribers listen for entity events
  subscribers: ['dist/**/*.subscriber.js'],

  // migrations are compiled to the dist/ folder as js files
  migrations: [join(__dirname, 'modules/database/migrations/*.js')],

  // the synchronize feature auto-generates schema + migrations (this developer convenience option is unsafe for production because it can drop tables/data)
  synchronize: true,

  // the dropSchema feature drops the schema each time a connection is established (this developer convenience option is unsafe for production because it will drop tables/data)
  dropSchema: false,

  // log queries to console in development
  logging: process.env.NODE_ENV === 'development',

  // specify the default locations where typeorm should save new migrations/entities/subscribers created via cli
  // for this project it is recommended to create new entities and subscribers in the appropriate module folder per nestjs conventions
  cli: {
    migrationsDir: 'src/modules/database/migrations',
    // entitiesDir: ...
    // subscribersDir: ...
  },

  // connection options to be passed to underlying typeorm database driver (note: this option will be deprecated in future releases of typeorm)
  // extra: {
  //   // max: ... // maxConnections
  //   // ssl: ... // requires ca, key, cert
  // },
}

export default ormconfig
