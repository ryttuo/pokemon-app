import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./features/pokemon/pokemon.component').then(
        (m) => m.PokemonComponent
      ),
  },
];
