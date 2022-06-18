import { Type } from 'class-transformer'
import { IsEmail, IsString, IsNotEmpty, Length, ValidateNested, IsOptional } from 'class-validator'
import { UserProfileDto } from './user-profile.dto'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 256)
  password!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @ValidateNested()
  @Type(() => UserProfileDto)
  @IsOptional()
  profile?: UserProfileDto
}
