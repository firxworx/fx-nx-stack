import { UserBaseResponse } from './user-base-response.interface'

export interface UserDetailResponse extends UserBaseResponse {
  locale: string
  timezone: string
  hourCycle: string
  currency: string
}
