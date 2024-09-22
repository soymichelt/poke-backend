/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@module/infrastructure/app.module';

jest.setTimeout(300000);

describe('GetPokemonWithTypesController tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /pokemonAndTypes/1', async () => {
    const pokemonId = 1;

    const result = await request(app.getHttpServer()).get(
      `/pokemonAndTypes/${pokemonId}`,
    );

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      name: 'bulbasaur',
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            names: [
              {
                language: {
                  name: 'es',
                  url: 'https://pokeapi.co/api/v2/language/7/',
                },
                name: 'Planta',
              },
              {
                language: {
                  name: 'ja',
                  url: 'https://pokeapi.co/api/v2/language/11/',
                },
                name: 'くさ',
              },
            ],
            url: 'https://pokeapi.co/api/v2/type/12/',
          },
        },
        {
          slot: 2,
          type: {
            name: 'poison',
            names: [
              {
                language: {
                  name: 'es',
                  url: 'https://pokeapi.co/api/v2/language/7/',
                },
                name: 'Veneno',
              },
              {
                language: {
                  name: 'ja',
                  url: 'https://pokeapi.co/api/v2/language/11/',
                },
                name: 'どく',
              },
            ],
            url: 'https://pokeapi.co/api/v2/type/4/',
          },
        },
      ],
    });
  });
});
