import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  readonly apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/pokemons?offset=${offset}&limit=${limit}`);
  }


  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/pokemon-details?name=${name}`);
  }


}
