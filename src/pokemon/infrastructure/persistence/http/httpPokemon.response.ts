export type HttpPokemonListResponse = {
  count: number;
  next?: string;
  previous?: string;

  results: {
    name: string;
    url: string;
  }[];
};

export type HttpPokemonResponse = {
  name: string;

  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type HttpPokemonTypeResponse = {
  name: string;

  names: {
    name: string;

    language: {
      name: string;
      url: string;
    };
  }[];
};
