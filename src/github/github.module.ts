import { HttpModule, Module } from '@nestjs/common';

import configuration from '../shared/config/env.config';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => {
        // initialize github configuration
        const {
          githubConfig: { accessHeader, baseUrl },
        } = configuration();
        return {
          headers: { Accept: accessHeader },
          baseURL: baseUrl,
        };
      },
    }),
  ],
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
