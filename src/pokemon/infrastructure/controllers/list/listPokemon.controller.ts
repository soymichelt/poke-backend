import { Controller, Get, Query } from '@nestjs/common';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { ListPokemonUseCase } from '@module/application/useCases/list/listPokemon.useCase';

@Controller('/pokemon/')
export class ListPokemonController {
  constructor(private readonly useCase: ListPokemonUseCase) {}

  @Get()
  public async run(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<PokemonResponse[]> {
    const result = await this.useCase.run({ offset, limit });

    return result;
  }
}
