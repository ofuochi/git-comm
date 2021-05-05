import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import configuration from './shared/config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule {}
