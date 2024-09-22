import { DomainException } from '@shared/domain/exceptions/domain.exception';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class GetPokemonException extends DomainException {
  constructor(error: Error) {
    super({
      name: 'GetPokemonException',
      message: `Unexpected error when trying to get a list of pokemons`,
      status: 500,
      code: ERROR_CODES['GetPokemonException'],
      errorType: 'error',
      metadata: {
        error: JSON.stringify(error),
      },
    });
  }
}
