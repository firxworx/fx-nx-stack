import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DeepPartial, In, Repository } from 'typeorm'
import { CrudService } from './types/crud-service.interface'
import { BaseAbstractEntity } from './base.abstract.entity'
import { isErrorWithCode } from './types/type-guards/is-error-with-code.type-guard'
import { PostgresErrorCode } from './constants/postgres-error-code.enum'

export abstract class CrudAbstractService<T extends Pick<BaseAbstractEntity, 'id' | 'uuid'>> implements CrudService<T> {
  protected constructor(protected genericRepository: Repository<T>) {}

  /**
   * Handle errors thrown by the Repository.
   */
  protected handleDatabaseError<T>(error: unknown): Promise<T> {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case PostgresErrorCode.UniqueViolation:
          return Promise.reject(new ConflictException('Unique violation'))
      }
    }

    if (error instanceof Error) {
      return Promise.reject(error)
    }

    throw new InternalServerErrorException()
  }

  /**
   * Find all entities in this repository.
   */
  async findAll(): Promise<Array<T>> {
    try {
      return this.genericRepository.find()
    } catch (error: unknown) {
      return this.handleDatabaseError(error)
    }
  }

  /**
   * Find multiple entities given either an array of numerical id's or an array of string uuid's.
   *
   * Returns an empty array if no matching results are found.
   */
  async find<IDS extends Array<number> | Array<string>>(identifiers: IDS): Promise<Array<T>> {
    try {
      if (isNumberArray(identifiers)) {
        return this.genericRepository.find({
          where: { id: In(identifiers) },
        })
      }

      if (isStringArray(identifiers)) {
        return this.genericRepository.find({
          where: { uuid: In(identifiers) },
        })
      }

      return Promise.reject(new Error('Invalid argument'))
    } catch (error: unknown) {
      return this.handleDatabaseError(error)
    }
  }

  /**
   * Find a single entity with the given id or uuid, or return `undefined`.
   */
  async findOne<ID extends number | string>(identifier: ID): Promise<T | undefined> {
    try {
      if (typeof identifier === 'string') {
        return this.genericRepository.findOne({
          where: {
            uuid: identifier,
          },
        })
      }

      return this.genericRepository.findOne(identifier)
    } catch (error: unknown) {
      return this.handleDatabaseError(error)
    }
  }

  /**
   * Create entity from the given partial DTO.
   */
  async create(dto: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.genericRepository.create(dto)

      // @ts-expect-error typeorm issue with DeepPartial and generics https://github.com/typeorm/typeorm/issues/2904
      const saved = await this.genericRepository.save(entity)

      // @ts-expect-error typeorm issue with DeepPartial and generics https://github.com/typeorm/typeorm/issues/2904
      return saved
    } catch (error: unknown) {
      return this.handleDatabaseError(error)
    }
  }

  /**
   * Update entity with the id or uuid with values from the given partial DTO.
   *
   * This method implements the `preload()` + `save()` pattern with typeorm which has advantages over using the `update()` method,
   * at the expense of an additional database query.
   *
   * This implementation pattern will trigger `@BeforeUpdate()` hooks on entities whereas `update()` will not.
   *
   * @link https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md#beforeupdate
   * @link https://github.com/typeorm/typeorm/issues/2904
   */
  async update(identifier: number | string, dto: DeepPartial<T>): Promise<T> {
    try {
      const id = typeof identifier === 'number' ? identifier : (await this.findOne(identifier))?.id

      if (!id) {
        throw new NotFoundException('Not found')
      }

      const entity = await this.genericRepository.preload({
        id,
        ...dto,
      })

      if (!entity) {
        throw new NotFoundException('Not found')
      }

      // @ts-expect-error typeorm issue with DeepPartial and generics https://github.com/typeorm/typeorm/issues/2904
      await this.genericRepository.save(entity)

      return entity
    } catch (error: unknown) {
      return this.handleDatabaseError(error)
    }
  }

  /**
   * Remove entity given its corresponding id or uuid.
   */
  async remove(identifier: number | string): Promise<T> {
    const entity = await this.findOne(identifier)

    if (!entity) {
      throw new NotFoundException('Not found')
    }

    return this.genericRepository.remove(entity)
  }
}
