import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PokemonResponse } from '@module/application/responses/pokemon.response';
import { ListPokemonUseCase } from '@module/application/useCases/list/listPokemon.useCase';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/pokemon/')
export class ListPokemonController {
  constructor(private readonly useCase: ListPokemonUseCase) {}

  @Get()
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset (optional)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit (optional)',
  })
  public async run(
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number = 0,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 100,
  ): Promise<PokemonResponse[]> {
    const result = await this.useCase.run({ offset, limit });

    return result;
  }
}
