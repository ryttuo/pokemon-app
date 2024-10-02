import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { PokemonFacadeService } from '../../shared/services/pokemon/pokemon-facade.service';
import { PokemonService } from '../../shared/services/pokemon/pokemon.service';

interface IPokemonList {
  image: string;
  name: string;
}

interface IPokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonList[];
}

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PokemonFacadeService, PokemonService],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit {
  public pokemonData: IPokemonData = {
    count: 0,
    next: '',
    previous: null,
    results: [],
  };
  public loading = false;
  public current = 0;
  private limit = 10;
  private offset = 0;

  private pokemonFacade = inject(PokemonFacadeService);

  async ngOnInit() {
    await this.getPokemonsData();
  }

  public async previousPage() {
    this.offset -= this.limit;
    await this.getPokemonsData();
  }

  public async nextPage() {
    this.offset += this.limit;
    await this.getPokemonsData();
  }

  private async getPokemonsData() {
    this.loading = true;
    this.current = this.offset / this.limit;
    this.pokemonData = await this.pokemonFacade.getPokemons(
      this.offset,
      this.limit
    );
    this.loading = false;
  }
}
