import { Length, IsOptional, IsLocale, IsIn, IsAlpha } from 'class-validator'

export class UserProfileDto {
  @IsOptional()
  @IsLocale() // @todo confirm that the library's idea of locale and ours are in sync
  locale?: string

  @IsOptional()
  timezone?: string // @todo implement custom validator?

  @IsOptional()
  hourCycle?: string // @todo implement custom validator?

  @IsOptional()
  @IsAlpha()
  @Length(3, 3)
  @IsIn(['USD', 'CAD', 'GBP'])
  currency?: string // @todo implement custom validator (note: class-validator presently has an umerged PR w/ implementation)
}
