import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { User } from './entities/user.entity'
import { PaginatedResponseDto } from '../database/dto/paginated-response.dto'
import { QueryUtilsService } from '../database/query-utils.service'
import { PageFilterSortParams } from '../database/types/page-filter-sort-params.interface'
import { CrudAbstractService } from '../database/crud.abstract.service'

@Injectable()
export class UsersService extends CrudAbstractService<User> {
  private logger = new Logger(UsersService.name)

  constructor(
    private queryUtilsService: QueryUtilsService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    })
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.findByEmail(email)

    if (!user) {
      throw new NotFoundException(`User not found: ${email}`)
    }

    return user
  }

  /**
   * Find and return the user with the given email, specifically including the `password` and `refreshTokenHash` fields.
   *
   * This method is intended for authentication-related use-cases only.
   *
   * The user returned by this method should not be logged or returned by any response because it includes sensitive data.
   */
  async findByEmailForVerification(email: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select('user.email', 'email')
      .addSelect('user.password')
      .addSelect('user.refreshTokenHash')
      .where('user.email = :email', { email })
      .getOne()
  }

  /**
   * Find and return the user at the given id including select for their `password` and `refreshTokenHash` fields.
   *
   * As with other find* methods, returns `undefined` if no user is found.
   *
   * This method supports authentication-related use-cases. The user returned by this method should not be logged or
   * returned by any response because it includes sensitive data.
   */
  async findByIdForVerification(id: number): Promise<User | undefined> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select('user.email', 'email')
      .addSelect('user.password')
      .addSelect('user.refreshTokenHash')
      .where('user.id = :id', { id })
      .getOne()
  }

  async getPaginatedUsers(params: PageFilterSortParams<User>): Promise<PaginatedResponseDto<User>> {
    const [users, totalCount] = await this.usersRepository.findAndCount({
      ...this.queryUtilsService.generatePageFilterSortFindOptions(params),
    })

    return new PaginatedResponseDto(User, users, totalCount)
  }

  /**
   * Set the value of the given user's password property given a computed hash.
   *
   * This function is intended for use by auth-related modules. It assumes that it is being
   * provided a salted hash that was computed via a half-decent algorithm.
   */
  async setPasswordHash(userId: number, passwordHash: string): Promise<UpdateResult> {
    return this.usersRepository.update(userId, {
      password: passwordHash,
    })
  }

  /**
   * Set the value of the given user's refreshTokenHash property. This function is intended for
   * use by an auth-related module and assumes that it is being provided a computed hash.
   */
  async setRefreshTokenHash(userId: number, refreshTokenHash: string): Promise<UpdateResult> {
    return this.usersRepository.update(userId, {
      refreshTokenHash,
    })
  }

  /**
   * Reset/clear (set to `null`) the given user's `refreshTokenHash`.
   */
  async clearRefreshTokenHash(userId: number): Promise<UpdateResult> {
    return this.usersRepository.update(userId, {
      refreshTokenHash: null,
    })
  }

  /**
   * Get user by refresh token.
   */
  async getByIdWithRefreshToken(userId: number): Promise<User | undefined> {
    // explicitly query for the excluded/not-selected refreshTokenHash field
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id: userId })
      .addSelect('user.refreshTokenHash')
      .getOne()

    if (!user) {
      this.logger.error(`Error querying user with refresh token - user id <${userId}>`)
      throw new InternalServerErrorException()
    }

    return user
  }
}
