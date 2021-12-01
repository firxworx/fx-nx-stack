import { registerAs } from '@nestjs/config'
import { DatabaseConfig } from './types/database-config.interface'

export default registerAs('database', (): DatabaseConfig => {
  const port = Number(process.env.DB_PORT ?? process.env.POSTGRES_PORT ?? process.env.RDS_PORT)

  return {
    hostname:
      process.env.DB_HOSTNAME ??
      process.env.DB_HOST ??
      process.env.POSTGRES_HOST ??
      process.env.RDS_HOSTNAME ??
      'localhost',
    port: !isNaN(port) ? port : 5432,
    name: process.env.DB_NAME ?? process.env.POSTGRES_DB ?? process.env.RDS_DB_NAME ?? 'postgres',
    username:
      process.env.DB_USERNAME ??
      process.env.DB_USER ??
      process.env.POSTGRES_USER ??
      process.env.RDS_USERNAME ??
      'postgres',
    password:
      process.env.DB_PASSWORD ??
      process.env.DB_PASS ??
      process.env.POSTGRES_PASSWORD ??
      process.env.RDS_PASSWORD ??
      'postgres',
  }
})
