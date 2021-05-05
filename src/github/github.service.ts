import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

import { GithubCommitDto } from './dto/github-commit.dto';
import { QueryGithubCommitDto } from './dto/query-commit.dto';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  getCommits(
    owner: string,
    repo: string,
    query?: QueryGithubCommitDto,
  ): Promise<GithubCommitDto[]> {
    // transform response and map to DTO
    const transformRes = map<AxiosResponse<any[]>, GithubCommitDto[]>(
      ({ data }) => {
        const transform = plainToClass(GithubCommitDto, data, {
          enableImplicitConversion: true,
          excludeExtraneousValues: true,
        });
        return transform;
      },
    );

    return this.httpService
      .get(`/repos/${owner}/${repo}/commits`, { params: query })
      .pipe<GithubCommitDto[]>(transformRes)
      .toPromise();
  }
}
