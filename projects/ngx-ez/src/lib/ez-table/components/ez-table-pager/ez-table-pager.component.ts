import { Component } from '@angular/core';

import { EzTableComponent } from '../ez-table/ez-table.component';

@Component({
  selector: 'ez-table-pager',
  templateUrl: './ez-table-pager.component.html',
  styleUrls: ['./ez-table-pager.component.scss'],
  standalone: false,
})
export class EzTablePagerComponent<T> {
  config = this.table.config;

  changeSize(pageSize: string | 'All') {
    this.table.currentPageSize.set(pageSize === 'All' ? pageSize : Number(pageSize));
    this.table.goto(1);
  }

  constructor(public table: EzTableComponent<T>) {}
}
