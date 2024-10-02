import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { IPokemonData, IPokemon } from '@pokemon-app/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('pokemons')
  getPokemons(
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ): Observable<IPokemonData> {
    return this.appService.getPokemons(offset, limit);
  }

  @Get('pokemon-details')
  getPokemonDetails(@Query('name') name: string): Observable<IPokemon> {
    return this.appService.getPokemonDetails(name);
  }
}
