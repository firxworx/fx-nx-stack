import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
// import { InjectRepository } from '@nestjs/typeorm'
// import { Repository, UpdateResult } from 'typeorm'

// import { User } from './entities/user.entity'
// import { PaginatedResponseDto } from '../database/dto/paginated-response.dto'
// import { PageFilterSortParams } from '../database/types/page-filter-sort-params.interface'

import type { User } from '../../generated/prisma-client' // @todo - on plane... should this be DI imported or via PrismaService or other service??
import { PrismaService } from '../../prisma.service'
import { ChangePasswordDto } from '../auth/dto/change-password.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserBaseResponse } from './types/interfaces/user-base-response.interface'

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name)

  private readonly ERRORS = {
    USER_NOT_FOUND: 'User not found',
    NO_CHANGE_PASSWORD_MATCH: 'New and old passwords cannot match',
  }

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserBaseResponse[]> {
    return this.prisma.user.findMany({ select: { name: true, email: true } })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user ?? undefined
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.findByEmail(email)

    if (!user) {
      throw new NotFoundException(this.ERRORS.USER_NOT_FOUND)
    }

    return user
  }

  async findById(userId: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user ?? undefined
  }

  async getById(userId: number): Promise<User> {
    const user = await this.findById(userId)

    if (!user) {
      throw new NotFoundException(this.ERRORS.USER_NOT_FOUND)
    }

    return user
  }

  async create(dto: CreateUserDto, hashFunction: (input: string) => Promise<string>): Promise<UserBaseResponse> {
    const { password, profile, ...restUserDto } = dto

    const user = await this.prisma.user.create({
      data: {
        ...restUserDto,
        userSecretId: undefined,
        profile: {
          create: {
            userId: undefined,
            ...profile,
          },
        },
        secret: {
          create: {
            userId: undefined,
            password: await hashFunction(password),
          },
        },
      },
      select: {
        name: true,
        email: true,
      },
    })

    this.logger.log(`created user ${user.email}`)
    return user
  }

  async changePassword(userId: number, dto: ChangePasswordDto, hashFunction: (input: string) => Promise<string>) {
    if (dto.newPassword === dto.oldPassword) {
      throw new BadRequestException(this.ERRORS.NO_CHANGE_PASSWORD_MATCH)
    }

    return this.prisma.user.update({
      data: {
        secret: {
          update: {
            password: await hashFunction(dto.newPassword),
          },
        },
      },
      where: {
        id: userId,
      },
    })
  }

  async update(userId: number, dto: UpdateUserDto) {
    const { profile } = dto

    // throws if user not found
    const checkUser = await this.getById(userId)

    if (userId !== checkUser.id) {
      // @todo trigger email flow (or use nestjs events?? or aws-driven?? hmm)
      this.logger.log(`placeholder send email...`)
    }

    return this.prisma.user.update({
      data: {
        ...dto,
        profile: {
          update: {
            ...profile,
          },
        },
      },
      where: {
        id: userId,
      },
    })
  }

  async deleteById(userId: number) {
    // throws if user not found
    await this.getById(userId)

    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }

  async deleteByEmail(email: string) {
    // throws if user not found
    await this.getByEmail(email)

    return this.prisma.user.delete({
      where: {
        email,
      },
    })
  }

  /**
   * Find and return the user with the given email, specifically including the `password` and `refreshTokenHash` fields.
   *
   * This method is intended for authentication-related use-cases only.
   *
   * The user returned by this method should not be logged or returned by any response because it includes sensitive data.
   */
  // async findByEmailForVerification(email: string): Promise<User> {
  //   return this.usersRepository
  //     .createQueryBuilder('user')
  //     .select('user.email', 'email')
  //     .addSelect('user.password')
  //     .addSelect('user.refreshTokenHash')
  //     .where('user.email = :email', { email })
  //     .getOne()
  // }

  /**
   * Find and return the user at the given id including select for their `password` and `refreshTokenHash` fields.
   *
   * As with other find* methods, returns `undefined` if no user is found.
   *
   * This method supports authentication-related use-cases. The user returned by this method should not be logged or
   * returned by any response because it includes sensitive data.
   */
  // async findByIdForVerification(id: number): Promise<User | undefined> {
  //   return this.usersRepository
  //     .createQueryBuilder('user')
  //     .select('user.email', 'email')
  //     .addSelect('user.password')
  //     .addSelect('user.refreshTokenHash')
  //     .where('user.id = :id', { id })
  //     .getOne()
  // }

  // async getPaginatedUsers(params: PageFilterSortParams<User>): Promise<PaginatedResponseDto<User>> {
  //   const [users, totalCount] = await this.usersRepository.findAndCount({
  //     ...this.queryUtilsService.generatePageFilterSortFindOptions(params),
  //   })

  //   return new PaginatedResponseDto(User, users, totalCount)
  // }

  /**
   * Set the value of the given user's password property given a computed hash.
   *
   * This function is intended for use by auth-related modules. It assumes that it is being
   * provided a salted hash that was computed via a half-decent algorithm.
   */
  // async setPasswordHash(userId: number, passwordHash: string): Promise<UpdateResult> {
  //   return this.usersRepository.update(userId, {
  //     password: passwordHash,
  //   })
  // }

  /**
   * Set the value of the given user's refreshTokenHash property. This function is intended for
   * use by an auth-related module and assumes that it is being provided a computed hash.
   */
  // async setRefreshTokenHash(userId: number, refreshTokenHash: string): Promise<UpdateResult> {
  //   return this.usersRepository.update(userId, {
  //     refreshTokenHash,
  //   })
  // }

  /**
   * Reset/clear (set to `null`) the given user's `refreshTokenHash`.
   */
  // async clearRefreshTokenHash(userId: number): Promise<UpdateResult> {
  //   return this.usersRepository.update(userId, {
  //     refreshTokenHash: null,
  //   })
  // }

  /**
   * Get user by refresh token.
   */
  // async getByIdWithRefreshToken(userId: number): Promise<User | undefined> {
  //   // explicitly query for the excluded/not-selected refreshTokenHash field
  //   const user = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .where({ id: userId })
  //     .addSelect('user.refreshTokenHash')
  //     .getOne()

  //   if (!user) {
  //     this.logger.error(`Error querying user with refresh token - user id <${userId}>`)
  //     throw new InternalServerErrorException()
  //   }

  //   return user
  // }
}
