import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Pokemon, PokemonPrimitives } from '@module/domain/pokemon';
import {
  ListProps,
  PokemonRepository,
} from '@module/domain/repositories/pokemon.repository';
import { HttpWithRetryService } from '@shared/infrastructure/http/httpWithRetry.service';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequired.exception';
import {
  HttpPokemonListResponse,
  HttpPokemonResponse,
  HttpPokemonTypeResponse,
} from '@module/infrastructure/persistence/http/httpPokemon.response';

@Injectable()
export class HttpPokemonRepository implements PokemonRepository {
  private POKEMON_API_URL: string;

  constructor(
    private readonly httpService: HttpWithRetryService,
    private readonly configService: ConfigService,
  ) {
    this.prepare();
  }

  public async list(props: ListProps): Promise<Pokemon[]> {
    try {
      const { offset = 0, limit = 100 } = props;
      const response = await firstValueFrom(
        this.httpService.get<HttpPokemonListResponse>(
          `${this.POKEMON_API_URL}/pokemon?offset=${offset}&limit=${limit}`,
        ),
      );

      const result = response.data.results.map((data) =>
        this.mapToPokemon(data),
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async get(id: number): Promise<Pokemon> {
    try {
      const response = await this.getPokemon(id);
      if (!response) return;

      const result = this.mapToPokemon({
        name: response.name,
        types: response.types,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getWithTypes(id: number): Promise<Pokemon> {
    try {
      const pokemon = await this.getPokemon(id);
      if (!pokemon) return;

      const typesPromises = pokemon.types.map(async ({ slot, type }) => {
        const typeData = await this.getType(type.url);

        return {
          slot: slot,
          type: {
            name: type.name,
            url: type.url,
            names: typeData.names.filter((name) =>
              ['ja', 'es'].includes(name.language.name),
            ),
          },
        };
      });

      const types = await Promise.all(typesPromises);

      return this.mapToPokemon({
        name: pokemon.name,
        types,
      });
    } catch (error) {
      throw error;
    }
  }

  private async getPokemon(id: number): Promise<HttpPokemonResponse> {
    const response = await firstValueFrom(
      this.httpService.get<HttpPokemonResponse>(
        `${this.POKEMON_API_URL}/pokemon/${id}`,
      ),
    );

    return response.data;
  }

  private async getType(url: string): Promise<HttpPokemonTypeResponse> {
    const response = await firstValueFrom(
      this.httpService.get<HttpPokemonTypeResponse>(url),
    );

    return response.data;
  }

  private prepare(): void {
    const POKEMON_API_URL = this.configService.get('POKEMON_API_URL');
    if (!POKEMON_API_URL) {
      throw new ArgRequiredException('POKEMON_API_URL');
    }

    this.POKEMON_API_URL = POKEMON_API_URL;
  }

  private mapToPokemon(data: PokemonPrimitives): Pokemon {
    return Pokemon.fromPrimitives(data);
  }
}
