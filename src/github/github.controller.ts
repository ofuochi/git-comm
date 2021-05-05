import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GithubService } from './github.service';
import { GithubCommitDto } from './dto/github-commit.dto';
import { QueryGithubCommitDto } from './dto/query-commit.dto';

@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  /*
   * gets github commit
   */
  @Get(':owner/:repo/commits')
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Resource not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Error',
  })
  async getCommits(
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Query() query?: QueryGithubCommitDto,
  ): Promise<GithubCommitDto[]> {
    try {
      return await this.githubService.getCommits(owner, repo, query);
    } catch (error: any) {
      throw new HttpException(
        error?.response?.statusText || 'Internal Error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
