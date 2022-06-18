import { IsString, Length } from 'class-validator'

export class AuthUserDto {
  @IsString()
  @Length(8, 256)
  oldPassword!: string

  @IsString()
  @Length(8, 256)
  password!: string
}
