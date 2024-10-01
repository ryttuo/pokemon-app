import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new Error(`Failed to fetch data: ${error.message}`);
        })
      );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        map((response) => {
          const { name, sprites } = response.data;
          return {
            name,
            image: sprites?.front_default,
          };
        }),
        catchError((error) => {
          throw new Error(`Failed to fetch data: ${error.message}`);
        })
      );
  }
}
