import { Component } from '@angular/core';

import { EzTableComponent } from '../ez-table/ez-table.component';

@Component({
  selector: 'ez-table-pager',
  templateUrl: './ez-table-pager.component.html',
  styleUrls: ['./ez-table-pager.component.css']
})
export class EzTablePagerComponent {
  changeSize(pageSize) {
    if (pageSize === 'All') {
      this.table.pageSize = pageSize;
    } else {
      this.table.pageSize = parseInt(pageSize);
    }
    this.table.goto(1);
  }

  constructor(public table: EzTableComponent) { }
}
