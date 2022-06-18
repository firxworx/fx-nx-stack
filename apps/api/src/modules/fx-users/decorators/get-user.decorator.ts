import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { User } from '../../../generated/prisma-client'

/**
 * Param decorator that returns an authenticated user as attached to the `request` object
 * by a PassportJS strategy.
 */
export const GetUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
