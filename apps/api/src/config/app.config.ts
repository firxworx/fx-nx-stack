import { registerAs } from '@nestjs/config'

import { DEFAULT_API_VERSION, DEFAULT_BASE_PATH, DEFAULT_PORT } from './defaults'
import { AppConfig } from './types/app-config.interface'

const PORT = parseInt(process.env.PORT, 10) || DEFAULT_PORT

export default registerAs('app', (): AppConfig => {
  if (process.env.ORIGIN === undefined || (process.env.NODE_ENV === 'production' && process.env.ORIGIN === '*')) {
    throw new Error(`Invalid origin specified in environment: '${process.env.ORIGIN}'`)
  }

  return {
    origin: process.env.ORIGIN,
    port: PORT,
    basePath: process.env.BASE_PATH ?? DEFAULT_BASE_PATH,
    apiVersion: process.env.API_VERSION ?? DEFAULT_API_VERSION,
    express: {
      compression: Boolean(process.env.COMPRESSION) ?? false,
      trustProxy: Boolean(process.env.TRUST_PROXY) ?? false,
    },
  }
})
