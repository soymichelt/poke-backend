import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@shared/domain/useCases/base.useCase';
import { GetPokemonWithTypesRequest } from '@module/application/useCases/getWithTypes/getPokemonWithTypes.request';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { PokemonRepository } from '@module/domain/repositories/pokemon.repository';
import { PokemonNotFoundException } from '@module/domain/exceptions/pokemonNotFound.exception';

@Injectable()
export class GetPokemonWithTypesUseCase extends BaseUseCase<
  GetPokemonWithTypesRequest,
  PokemonResponse
> {
  constructor(
    @Inject('PokemonRepository') private readonly repository: PokemonRepository,
  ) {
    super();
  }

  public async run(
    request: GetPokemonWithTypesRequest,
  ): Promise<PokemonResponse> {
    const { id } = request;

    const pokemonSelected = await this.repository.getWithTypes(id);
    if (!pokemonSelected) {
      throw new PokemonNotFoundException(id);
    }

    return pokemonSelected.toPrimitives();
  }
}
