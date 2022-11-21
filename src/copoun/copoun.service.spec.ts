import { Test, TestingModule } from '@nestjs/testing';
import { CopounService } from './copoun.service';

describe('CopounService', () => {
  let service: CopounService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CopounService],
    }).compile();

    service = module.get<CopounService>(CopounService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
