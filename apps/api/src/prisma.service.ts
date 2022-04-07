import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * NestJS service that wraps the Prisma database client.
 *
 * @link https://docs.nestjs.com/recipes/prisma
 * @link https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nestjs/src
 * @link
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
