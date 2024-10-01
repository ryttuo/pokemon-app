import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('pokemons')
  getPokemons(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.appService.getPokemons(offset, limit);
  }

  @Get('pokemon-details')
  getPokemonDetails(@Query('name') name: string) {
    return this.appService.getPokemonDetails(name);
  }
}
