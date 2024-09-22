import { Pokemon } from '@module/domain/pokemon';

export type ListProps = {
  offset?: number;
  limit?: number;
};

export interface PokemonRepository {
  list(props: ListProps): Promise<Pokemon[]>;
  get(id: number): Promise<Pokemon>;
  getWithTypes(id: number): Promise<Pokemon>;
}
