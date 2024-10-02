import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IPokemonData, IPokemon } from '@pokemon-app/interfaces';
@Injectable()
export class AppService {
  readonly apiUrl = 'https://pokeapi.co/api';

  constructor(private readonly httpService: HttpService) {}

  getPokemons(offset: number, limit: number): Observable<IPokemonData> {
    return this.httpService
      .get(`${this.apiUrl}/v2/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new Error(`Failed to fetch data: ${error.message}`);
        })
      );
  }

  getPokemonDetails(name: string): Observable<IPokemon> {
    return this.httpService.get(`${this.apiUrl}/v2/pokemon/${name}`).pipe(
      map((response) => {
        const { id, name, sprites, url } = response.data;
        const result: IPokemon = {
          id,
          name,
          image: sprites?.front_default,
        };
        return result;
      }),
      catchError((error) => {
        throw new Error(`Failed to fetch data: ${error.message}`);
      })
    );
  }
}
