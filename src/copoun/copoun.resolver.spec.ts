import { Test, TestingModule } from '@nestjs/testing';
import { CopounResolver } from './copoun.resolver';
import { CopounService } from './copoun.service';

describe('CopounResolver', () => {
  let resolver: CopounResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CopounResolver, CopounService],
    }).compile();

    resolver = module.get<CopounResolver>(CopounResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
