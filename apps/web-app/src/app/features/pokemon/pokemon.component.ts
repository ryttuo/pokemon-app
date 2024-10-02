import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonFacadeService } from '../../shared/services/pokemon/pokemon-facade.service';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../../shared/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PokemonFacadeService, PokemonService],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit {
  private pokemonFacade = inject(PokemonFacadeService);

  async ngOnInit() {
    const pokemonsData = await this.pokemonFacade.getPokemons(20, 20);

    console.log(pokemonsData);
  }
}
