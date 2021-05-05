import {
  BadRequestException,
  HttpService,
  HttpStatus,
  INestApplication,
  InternalServerErrorException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('GithubController (e2e)', () => {
  let app: INestApplication;

  // mock http service
  const httpService = {
    get: () => ({ pipe: () => ({ toPromise: () => null }) }),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    app = moduleFixture.createNestApplication();

    // setup validation pipeline
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it(`should return ${BadRequestException.name}`, async () => {
    return request(app.getHttpServer())
      .get('/github/owner/repo/commits')
      .query({ page_size: 101 })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should get commits', async () => {
    const expected: any = { test: 'test' };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce({ pipe: () => ({ toPromise: () => expected }) });

    return request(app.getHttpServer())
      .get('/github/owner/repo/commits')
      .expect(HttpStatus.OK)
      .expect(expected);
  });

  it(`should return ${NotFoundException.name}`, async () => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce({
      pipe: () => ({
        toPromise: () =>
          Promise.reject<NotFoundException>({
            response: {
              statusText: 'error',
              status: HttpStatus.NOT_FOUND,
            },
          }),
      }),
    });

    return request(app.getHttpServer())
      .get('/github/owner/repo/commits')
      .expect(HttpStatus.NOT_FOUND);
  });

  it(`should return ${InternalServerErrorException.name}`, async () => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce({
      pipe: () => ({
        toPromise: () => Promise.reject<InternalServerErrorException>(),
      }),
    });

    return request(app.getHttpServer())
      .get('/github/owner/repo/commits')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  afterAll(async () => {
    await app.close();
  });
});
