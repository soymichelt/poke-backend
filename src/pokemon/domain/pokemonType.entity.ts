import { DomainEntity } from '@shared/domain/domain.entity';

export type PokemonTypeProps = {
  slot: number;
  type: {
    name: string;
    url: string;

    names?: {
      name: string;

      language: {
        name: string;
        url: string;
      };
    }[];
  };
};

export type PokemonTypePrimitives = PokemonTypeProps;

export class PokemonType extends DomainEntity {
  private _slot: number;
  private _type: {
    name: string;
    url: string;

    names?: {
      name: string;

      language: {
        name: string;
        url: string;
      };
    }[];
  };

  private constructor(props: PokemonTypeProps) {
    super();

    this._slot = props.slot;
    this._type = props.type;
  }

  public static build(props: PokemonTypeProps): PokemonType {
    return new PokemonType(props);
  }

  public static fromPrimitives(props: PokemonTypePrimitives): PokemonType {
    return this.build({
      slot: props.slot,
      type: props.type,
    });
  }

  public toPrimitives(): PokemonTypePrimitives {
    return {
      slot: this._slot,
      type: {
        name: this._type.name,
        url: this._type.url,
        names: this._type.names,
      },
    };
  }
}
