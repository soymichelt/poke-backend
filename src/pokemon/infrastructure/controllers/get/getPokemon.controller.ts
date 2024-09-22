import { Controller, Get, Param } from '@nestjs/common';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { GetPokemonUseCase } from '@module/application/useCases/get/getPokemon.useCase';

@Controller('/pokemon/')
export class GetPokemonController {
  constructor(private readonly useCase: GetPokemonUseCase) {}

  @Get(':id')
  public async run(@Param('id') id: number): Promise<PokemonResponse> {
    const result = await this.useCase.run({ id });

    return result;
  }
}
