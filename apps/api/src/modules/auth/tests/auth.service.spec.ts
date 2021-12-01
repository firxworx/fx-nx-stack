import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile()

    service = moduleRef.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // it('should return "Welcome to api!"', () => {
  //   expect(service.example()).toEqual({ message: 'Welcome to api!' })
  // })
})
