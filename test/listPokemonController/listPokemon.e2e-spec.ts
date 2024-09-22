import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@module/infrastructure/app.module';

jest.setTimeout(300000);

describe('ListPokemonController tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /pokemon/', async () => {
    const result = await request(app.getHttpServer()).get('/pokemon/');

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toHaveLength(100);
  });

  it('GET /pokemon/?offset=10&limit=10', async () => {
    const offset = 10;
    const limit = 10;

    const result = await request(app.getHttpServer()).get(
      `/pokemon/?offset=${offset}&limit=${limit}`,
    );

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toHaveLength(10);
    expect(result.body).toEqual([
      { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
      { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
      { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
      { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
      { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
      { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
      { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
      { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
      { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
      { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' },
    ]);
  });
});
