import { DomainException } from '@shared/domain/exceptions/domain.exception';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class PokemonNotFoundException extends DomainException {
  constructor(id: number) {
    super({
      name: 'PokemonNotFoundException',
      message: `Pokemon with ID "${id}" not found`,
      status: 404,
      code: ERROR_CODES['PokemonNotFoundException'],
      errorType: 'error',
    });
  }
}
