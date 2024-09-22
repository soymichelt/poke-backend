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

  it('GET /pokemon/1', async () => {
    const pokemonId = 1;

    const result = await request(app.getHttpServer()).get(
      `/pokemon/${pokemonId}`,
    );

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      name: 'bulbasaur',
      types: [
        {
          slot: 1,
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
        {
          slot: 2,
          type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
        },
      ],
    });
  });
});
