import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { GithubController } from './github.controller';
import { GithubModule } from './github.module';
import { GithubService } from './github.service';

describe('GithubController', () => {
  let controller: GithubController;
  const githubService = { getCommits: () => null };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GithubModule],
    })
      .overrideProvider(GithubService)
      .useValue(githubService)
      .compile();

    controller = module.get<GithubController>(GithubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get commits', async () => {
    const data = { test: 'data' };
    githubService.getCommits = () => data;
    expect(await controller.getCommits('', '')).toMatchObject(data);
  });
  it(`should throw ${NotFoundException.name}`, async () => {
    githubService.getCommits = () => {
      throw new NotFoundException();
    };
    await expect(controller.getCommits('', '')).rejects.toThrowError(
      HttpException,
    );
  });
});
