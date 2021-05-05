import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { GithubModule } from './github.module';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  const httpService = {
    get: () => ({ pipe: () => ({ toPromise: () => null }) }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GithubModule],
    })
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return data', async () => {
    const expected: any = { test: 'test' };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue({ pipe: () => ({ toPromise: () => expected }) });

    expect(await service.getCommits('', '')).toBe(expected);
  });
});
