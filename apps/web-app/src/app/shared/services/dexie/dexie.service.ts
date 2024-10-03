import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { IPokemonData } from '@pokemon-app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DexieService extends Dexie {
  pages!: Table<IPokemonData, string>;

  constructor() {
    super('PokemonDatabase');
    this.version(1).stores({
      pages: 'uuid',
    });
    this.pages = this.table('pages');
  }

  async savePage(page: IPokemonData): Promise<void> {
    await this.pages.put(page);
  }

  async getPageByUUID(uuid: string): Promise<IPokemonData | undefined> {
    return await this.pages.get(uuid);
  }

  async deletePageByUUID(uuid: string): Promise<void> {
    await this.pages.delete(uuid);
  }
}
