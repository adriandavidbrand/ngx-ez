import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  tableData = [
    { firstName: 'Billy', lastName: 'Bob' },
    { firstName: 'Mary', lastName: 'Joe' },
    { firstName: 'Sue', lastName: 'Harris' },
    { firstName: 'Bob', lastName: 'Walker' },
    { firstName: 'Harry', lastName: 'Jones' },
    { firstName: 'Hillary', lastName: 'Smith' },
    { firstName: 'Joe', lastName: 'Jones' },
  ];
}
