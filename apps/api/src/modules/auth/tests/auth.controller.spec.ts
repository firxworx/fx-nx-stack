import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth.controller'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile()

    controller = moduleRef.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // it('should return "Welcome to api!"', () => {
  //   expect(controller.getData()).toEqual({ message: 'Welcome to api!' })
  // })
})
