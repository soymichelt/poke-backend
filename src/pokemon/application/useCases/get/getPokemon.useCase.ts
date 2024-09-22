import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@shared/domain/useCases/base.useCase';
import { GetPokemonRequest } from '@module/application/useCases/get/getPokemon.request';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { PokemonRepository } from '@module/domain/repositories/pokemon.repository';
import { PokemonNotFoundException } from '@module/domain/exceptions/pokemonNotFound.exception';

@Injectable()
export class GetPokemonUseCase extends BaseUseCase<
  GetPokemonRequest,
  PokemonResponse
> {
  constructor(
    @Inject('PokemonRepository') private readonly repository: PokemonRepository,
  ) {
    super();
  }

  public async run(request: GetPokemonRequest): Promise<PokemonResponse> {
    const { id } = request;

    const pokemonSelected = await this.repository.get(id);
    if (!pokemonSelected) {
      throw new PokemonNotFoundException(id);
    }

    return pokemonSelected.toPrimitives();
  }
}
