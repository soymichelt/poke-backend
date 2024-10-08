import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { GetPokemonWithTypesUseCase } from '@module/application/useCases/getWithTypes/getPokemonWithTypes.useCase';

@Controller('/pokemonAndTypes/')
export class GetPokemonWithTypesController {
  constructor(private readonly useCase: GetPokemonWithTypesUseCase) {}

  @Get(':id')
  public async run(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PokemonResponse> {
    const result = await this.useCase.run({ id });

    return result;
  }
}
