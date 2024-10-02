import { TestBed } from '@angular/core/testing';

import { PokemonFacadeService } from './pokemon-facade.service';

describe('PokemonFacadeService', () => {
  let service: PokemonFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
