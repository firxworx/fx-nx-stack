import { Test, TestingModule } from '@nestjs/testing'
import { QueryUtilsService } from '../query-utils.service'

describe('QueryUtilsService', () => {
  let app: TestingModule
  let service: QueryUtilsService

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [QueryUtilsService],
    }).compile()

    service = app.get<QueryUtilsService>(QueryUtilsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
