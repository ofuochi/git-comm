import { Expose, Type } from 'class-transformer';

export class CommitAuthorDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @Type(() => Date)
  date: Date;
}
export class CommitDto {
  @Expose()
  url: string;
  @Expose()
  author: CommitAuthorDto;
  @Expose()
  message: string;
  @Expose()
  comment_count: number;
}
export class GithubCommitDto {
  @Expose()
  url: string;
  @Expose()
  sha: string;
  @Expose()
  node_id: string;
  @Expose()
  commit: CommitDto;
}
