import { Test, TestingModule } from '@nestjs/testing'

import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UsersController', () => {
  let app: TestingModule

  let controller: UsersController
  let service: UsersService

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = app.get<UsersController>(UsersController)
    service = app.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
