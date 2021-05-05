import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import configuration from './shared/config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GithubModule,
  ],
})
export class AppModule {}
