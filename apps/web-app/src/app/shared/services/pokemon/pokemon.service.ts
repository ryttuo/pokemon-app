import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPokemon, IPokemonData } from '@pokemon-app/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  readonly apiUrl = 'http://localhost:3000'

  private http = inject(HttpClient);

  getPokemons(offset: number, limit: number): Observable<IPokemonData> {
    return this.http.get<IPokemonData>(`${this.apiUrl}/api/pokemons?offset=${offset}&limit=${limit}`);
  }


  getPokemonDetails(name: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.apiUrl}/api/pokemon-details?name=${name}`);
  }


}
