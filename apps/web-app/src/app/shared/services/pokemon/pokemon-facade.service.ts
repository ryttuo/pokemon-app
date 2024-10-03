import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { forkJoin } from 'rxjs';
import { IPokemon, IPokemonData } from '@pokemon-app/interfaces';
import { v5 as uuidv5 } from 'uuid';
import { DexieService } from '../dexie/dexie.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonFacadeService {
  private pokemonService = inject(PokemonService);
  private dexieService = inject(DexieService);

  async getPokemons(offset: number, limit: number): Promise<IPokemonData> {
    try {
      const uuid = uuidv5(`${offset}${limit}`, uuidv5.DNS);

      const cachedPage: IPokemonData | undefined =
        await this.dexieService.getPageByUUID(uuid);

      if (cachedPage) {
        console.log('🥳 cached page', cachedPage);
        return cachedPage;
      }

      const allPokemons = await lastValueFrom(
        this.pokemonService.getPokemons(offset, limit)
      );

      const pokemonsRequest: Observable<IPokemon>[] = allPokemons.results.map(
        (pokemon: IPokemon) =>
          this.pokemonService.getPokemonDetails(pokemon.name)
      );

      const results: IPokemon[] = await lastValueFrom(
        forkJoin(pokemonsRequest)
      );
      const { count, next, previous } = allPokemons;

      const pokemonDataResult: IPokemonData = {
        uuid,
        count,
        next,
        previous,
        results,
      };
      this.dexieService.savePage(pokemonDataResult);
      console.log('🛜 requested page', pokemonDataResult);
      return pokemonDataResult;
    } catch (error) {
      console.error('Error getting pokemons', error);
      throw new Error(`Failed to fetch Pokemon data ${error}`);
    }
  }
}
