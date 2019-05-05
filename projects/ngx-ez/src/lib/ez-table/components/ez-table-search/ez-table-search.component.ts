import { Component, Input } from '@angular/core';

import { EzTableComponent } from '../ez-table/ez-table.component';

@Component({
  selector: 'ez-table-search',
  templateUrl: './ez-table-search.component.html',
  styleUrls: ['./ez-table-search.component.css']
})
export class EzTableSearchComponent {
  @Input()
  label = 'Search';

  constructor(public table: EzTableComponent) { }

  search(search: string) {
    this.table.search = search;
    this.table.goto(1);
  }
}
