import { Component, Input } from '@angular/core';

import { EzTableComponent } from '../ez-table/ez-table.component';

@Component({
  selector: 'ez-table-search',
  templateUrl: './ez-table-search.component.html',
  styleUrls: ['./ez-table-search.component.scss'],
})
export class EzTableSearchComponent {
  @Input()
  label = 'Search';

  searchStr = '';

  constructor(public table: EzTableComponent) {}

  search(search: string) {
    this.searchStr = search;
    this.table.search = search;
    this.table.goto(1);
  }
}
