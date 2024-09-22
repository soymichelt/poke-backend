import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@shared/domain/useCases/base.useCase';
import { ListPokemonRequest } from '@module/application/useCases/list/listPokemon.request';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { PokemonRepository } from '@module/domain/repositories/pokemon.repository';

@Injectable()
export class ListPokemonUseCase extends BaseUseCase<
  ListPokemonRequest,
  PokemonResponse[]
> {
  constructor(
    @Inject('PokemonRepository') private readonly repository: PokemonRepository,
  ) {
    super();
  }

  public async run(request: ListPokemonRequest): Promise<PokemonResponse[]> {
    const { limit, offset } = request;

    const pokemonList = await this.repository.list({ limit, offset });

    return pokemonList.map((pokemon) => pokemon.toPrimitives());
  }
}
