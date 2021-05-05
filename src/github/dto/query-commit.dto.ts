import { IsDateString, IsOptional, Max } from 'class-validator';

import { MAX_PAGE_SIZE } from '../../shared/constants/dto.constant';

export class QueryGithubCommitDto {
  /*
   * SHA or branch to start listing commits from.
   * Default: the repository’s default branch (usually master).
   */
  @IsOptional()
  sha?: string;
  /*
   * Only commits containing this file path will be returned.
   */
  @IsOptional()
  path?: string;
  /*
   * GitHub login or email address by which to filter by commit author.
   */
  @IsOptional()
  author?: string;
  /*
   * Only show notifications updated after the given time.
   * This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  @IsOptional()
  @IsDateString({ strict: true })
  since?: string;
  /*
   * Only commits before this date will be returned.
   * This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  @IsOptional()
  @IsDateString({ strict: true })
  until?: string;
  /*
   * Results per page (max 100).
   */
  @IsOptional()
  @Max(MAX_PAGE_SIZE)
  per_page?: number = MAX_PAGE_SIZE;
  /*
   * Page number of the results to fetch.
   */
  @IsOptional()
  page?: number;
}
