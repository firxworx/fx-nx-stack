import { IsString, Length } from 'class-validator'

export class ChangePasswordDto {
  @IsString()
  @Length(8, 256)
  oldPassword!: string

  @IsString()
  @Length(8, 256)
  newPassword!: string
}
