import { Component, ContentChildren, QueryList, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

import { EzColumnComponent } from '../ez-column/ez-column.component';
import { multipleSort } from '../../../ez-core/functions/multiple-sort';
import { SortDirection } from '../../../ez-core/functions/multiple-sort';
import { groupBy, GroupBy, flattenGroups } from '../../../ez-core/functions/group-by';

@Component({
  selector: 'ez-table',
  templateUrl: './ez-table.component.html',
  styleUrls: ['./ez-table.component.css']
})
export class EzTableComponent implements OnInit, OnChanges {
  @Input('data')
  data: any[];

  @Input()
  tableId = 'table';

  @Input('groupBy')
  set updateGroupBy(groupBy: string | GroupBy) {
    if (typeof groupBy === 'string') {
      this.groupBy = { keys: groupBy.split(' ') };
    } else {
      this.groupBy = groupBy;
    }
  }
  groupBy: GroupBy;

  @Input()
  pageSize: string | number = 'All';

  @Input()
  pageSizes: any[] = [5, 10, 25, 50, 'All'];

  pageData: any[];

  columnSort: EzColumnComponent[] = [];

  search = '';
  pageNum = 1;
  pageNums = [];
  filteredPageNums = [];
  totalPages: number;
  totalRecords: number;
  start: number;
  finish: number;

  @ContentChildren(EzColumnComponent)
  columns: QueryList<EzColumnComponent>;

  update() {
    const searchArray = this.search ? this.search.toLowerCase().split(' ') : null;
    let filteredData =
      searchArray && searchArray.length
        ? this.data.filter(item =>
          searchArray.every(
            search =>
              this.columns.some(c => {
                const text = c.display ? c.display(item[c.property]) : item[c.property];
                return text ? text.toLowerCase().includes(search) : false;
              })
          )
        )
        : [...this.data];
    if (this.columnSort.length > 0) {
      multipleSort(
        filteredData,
        ...this.columnSort.map(c => ({
          property: c.property,
          direction: c.direction,
          compare: c.compare
        }))
      );
    }
    this.totalRecords = filteredData.length;
    if (typeof this.pageSize !== 'string' && this.pageSize < filteredData.length) {
      this.start = this.pageSize * (this.pageNum - 1) + 1;
      this.finish = this.start + this.pageSize - 1;
      if (this.finish > filteredData.length) {
        this.finish = filteredData.length;
      }
      this.totalPages =
        Math.floor(filteredData.length / this.pageSize) + (filteredData.length % this.pageSize === 0 ? 0 : 1);
      filteredData = filteredData.filter((_, i) => i >= this.start - 1 && i < this.finish);
      this.pageNums = Array.from(Array(this.totalPages), (_, i) => i + 1);
    } else {
      this.pageNum = 1;
      this.totalPages = 1;
      this.start = 1;
      this.finish = filteredData.length;
    }
    if (this.groupBy) {
      filteredData = flattenGroups(groupBy(filteredData, this.groupBy));
    }
    this.pageData = filteredData;
  }

  goto(pageNum: number) {
    this.pageNum = pageNum;
    this.update();
  }

  next() {
    if (this.pageNum < this.totalPages) {
      this.pageNum++;
      this.update();
    }
  }

  last() {
    if (this.pageNum < this.totalPages) {
      this.pageNum = this.totalPages;
      this.update();
    }
  }

  previous() {
    if (this.pageNum > 1) {
      this.pageNum--;
      this.update();
    }
  }

  first() {
    if (this.pageNum !== 1) {
      this.pageNum = 1;
      this.update();
    }
  }

  headerClick(column: EzColumnComponent, event: MouseEvent) {
    (event.target as HTMLElement).focus();
    this.sort(column, event.shiftKey);
  }

  sort(column: EzColumnComponent, multi: boolean) {
    if (column.sortable) {
      const current = this.columnSort.find(c => c === column);
      if (current) {
        column.direction = column.direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
      } else {
        column.direction = SortDirection.ascending;
      }
      if (!multi) {
        this.columnSort.forEach(c => {
          if (c !== column && c.direction) {
            delete c.direction;
          }
        });
        this.columnSort = [column];
      } else if (!current) {
        this.columnSort.push(column);
      }
      this.update();
    }
  }

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.goto(1);
  }
}
