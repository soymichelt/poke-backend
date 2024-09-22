import { AggregateRoot } from '@shared/domain/aggregateRoot';
import {
  PokemonType,
  PokemonTypePrimitives,
} from '@module/domain/pokemonType.entity';

export type PokemonProps = {
  name: string;
  url?: string;

  types?: PokemonType[];
};

export type PokemonPrimitives = Omit<PokemonProps, 'types'> & {
  types?: PokemonTypePrimitives[];
};

export class Pokemon extends AggregateRoot {
  private _name: string;
  private _url?: string;

  private _types?: PokemonType[];

  private constructor(props: PokemonProps) {
    super();

    this._name = props.name;
    this._url = props.url;

    this._types = props.types;
  }

  public static build(props: PokemonProps): Pokemon {
    return new Pokemon(props);
  }

  public static fromPrimitives(props: PokemonPrimitives): Pokemon {
    return this.build({
      name: props.name,
      url: props.url,

      types: props.types
        ? props.types.map((type) => PokemonType.fromPrimitives(type))
        : undefined,
    });
  }

  public toPrimitives(): PokemonPrimitives {
    return {
      name: this._name,
      url: this._url,

      types: this._types?.map((type) => type.toPrimitives()),
    };
  }
}
