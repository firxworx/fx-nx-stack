import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '../entities/user.entity'

/**
 * Param decorator that returns the user attached to the `request` object
 * by a PassportJS strategy when a user is authenticated.
 */
export const GetUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
