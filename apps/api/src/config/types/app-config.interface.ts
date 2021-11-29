export interface AppConfig {
  origin: string
  port: number
  basePath: string
  apiVersion: string
  express: {
    compression: boolean
    trustProxy: boolean
  }
}
