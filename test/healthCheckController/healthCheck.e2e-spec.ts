import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@module/infrastructure/app.module';

jest.setTimeout(300000);

describe('GetPokemonController tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /health-check/ping/', async () => {
    const result = await request(app.getHttpServer()).get(
      `/health-check/ping/`,
    );

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      details: {
        'Pokemon API': {
          status: 'up',
        },
      },
      error: {},
      info: {
        'Pokemon API': {
          status: 'up',
        },
      },
      status: 'ok',
    });
  });
});
