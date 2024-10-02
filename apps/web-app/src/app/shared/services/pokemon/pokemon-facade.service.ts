import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonFacadeService {
  constructor(private pokemonService: PokemonService) {}

  async getPokemons(offset: number, limit: number): Promise<any> {
    try {
      const allPokemons = await lastValueFrom(
        this.pokemonService.getPokemons(offset, limit)
      );

      const pokemonsRequest: Observable<any>[] = allPokemons.results.map(
        (pokemon: any) => this.pokemonService.getPokemonDetails(pokemon.name)
      );

      const results = await lastValueFrom(forkJoin(pokemonsRequest));
      const { count, next, previous } = allPokemons;

      return { count, next, previous, results };
    } catch (error) {
      console.error('Error getting pokemons', error);
    }
  }
}
