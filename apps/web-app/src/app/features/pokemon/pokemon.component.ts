import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IPokemonData } from '@pokemon-app/interfaces';
import { PokemonFacadeService } from '../../shared/services/pokemon/pokemon-facade.service';
import { PokemonService } from '../../shared/services/pokemon/pokemon.service';
import { DexieService } from '../../shared/services/dexie/dexie.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PokemonFacadeService, PokemonService, DexieService],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit {
  public pokemonData: IPokemonData = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
  public loading = false;
  public currentPage = 1;
  public totalPages = 0;
  private limit = 10;
  private offset = 0;

  private pokemonFacade = inject(PokemonFacadeService);

  async ngOnInit(): Promise<void> {
    await this.getPokemonsData();
  }

  public async previousPage(): Promise<void> {
    this.offset -= this.limit;
    await this.getPokemonsData();
  }

  public async nextPage(): Promise<void> {
    this.offset += this.limit;
    await this.getPokemonsData();
  }

  private async getPokemonsData(): Promise<void> {
    this.loading = true;
    this.currentPage = this.offset / this.limit + 1;
    this.pokemonData = await this.pokemonFacade.getPokemons(
      this.offset,
      this.limit
    );
    this.totalPages = Math.ceil(this.pokemonData.count / this.limit);
    this.loading = false;
  }
}
