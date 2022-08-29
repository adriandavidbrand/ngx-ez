import { Component } from '@angular/core';

import { EzTableComponent } from '../ez-table/ez-table.component';

@Component({
  selector: 'ez-table-pager',
  templateUrl: './ez-table-pager.component.html',
  styleUrls: ['./ez-table-pager.component.scss'],
})
export class EzTablePagerComponent {
  config = this.table.config;

  changeSize(pageSize: string | number) {
    this.table.pageSizeSet = pageSize;
    this.table.goto(1);
  }

  constructor(public table: EzTableComponent) {}
}
