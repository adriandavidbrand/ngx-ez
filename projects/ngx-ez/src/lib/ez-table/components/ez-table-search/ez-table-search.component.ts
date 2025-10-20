import { Component, input } from '@angular/core';

import { EzTableComponent } from '../ez-table/ez-table.component';

@Component({
  selector: 'ez-table-search',
  templateUrl: './ez-table-search.component.html',
  styleUrls: ['./ez-table-search.component.scss'],
  standalone: false,
})
export class EzTableSearchComponent<T> {
  readonly label = input('Search');

  searchStr = '';

  constructor(public table: EzTableComponent<T>) {}

  search(search: string) {
    this.searchStr = search;
    this.table.search.set(search);
    this.table.goto(1);
  }
}
