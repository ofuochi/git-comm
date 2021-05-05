import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

import { AppModule } from './app.module';
import configuration from './shared/config/env.config';

declare const module: any; // for hot module replacement

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // compressions
  app.use(compression());

  // validation setup
  const { port, environment } = configuration();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      disableErrorMessages: environment === 'production',
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger documentation setup
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('GitHubCommits API')
    .setDescription('GitHub commit information for a repository')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  const listener = await app.listen(process.env.PORT || port, function () {
    Logger.log('Listening on port ' + listener.address().port);
  });

  // check if HMR is enabled
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
