export interface IPokemon {
  id: string;
  name: string;
  image?: string;
  url?: string;
}

export interface IPokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}
