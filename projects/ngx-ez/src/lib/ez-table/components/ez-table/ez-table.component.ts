import { Component, ContentChildren, QueryList, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

import { EzColumnComponent } from '../ez-column/ez-column.component';
import { multipleSortFunction, SortDirection } from '../../../ez-core/functions/multiple-sort';
import { resolveProperty } from '../../../ez-core/functions';
import { groupBy, GroupBy, flattenGroups } from '../../../ez-core/functions/group-by';
import { EzTableConfigService } from '../../services/ez-table-config.service';
import { EzHeadingComponent } from '../ez-heading/ez-heading.component';

@Component({
  selector: 'ez-table',
  templateUrl: './ez-table.component.html',
  styleUrls: ['./ez-table.component.scss']
})
export class EzTableComponent implements OnInit, OnChanges {
  @Input()
  data: any[] = [];

  @Input()
  tableId = 'table';

  @Input('groupBy')
  set groupBySet(value: string | GroupBy) {
    if (typeof value === 'string') {
      this.groupBy = { keys: value.split(' ') };
    } else {
      this.groupBy = value;
    }
  }
  groupBy: GroupBy;

  @Input()
  pageSizes: any[] = [5, 10, 25, 50, 'All'];

  pageSize: string | number = 'All';
  @Input('pageSize')
  set pageSizeSet(value: string | number) {
    if (value === this.pageSizes[this.pageSizes.length - 1]) {
      this.pageSize = value;
    } else {
      this.pageSize = typeof value === 'string' ? parseInt(value) : value;
    }
  }

  @Input()
  maxPages = 10;

  @Input()
  noDataMessage = this.config.messages.noData;

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

  @ContentChildren(EzHeadingComponent)
  headings: QueryList<EzHeadingComponent>;

  @ContentChildren(EzColumnComponent)
  columns: QueryList<EzColumnComponent>;

  resolveProperty = resolveProperty;

  constructor(public config: EzTableConfigService) {}

  update() {
    if (!this.data) {
      this.pageData = [];
      this.totalRecords = 0;
      this.totalPages = 1;
      return;
    }
    const searchArray = this.search ? this.search.split(' ') : null;
    let filteredData =
      searchArray && searchArray.length
        ? this.data.filter(item =>
            searchArray.every(search => {
              const searchRegEx = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
              return this.columns.some(c =>
                searchRegEx.test(c.display ? c.display(item) : resolveProperty(item, c.property) || '')
              );
            })
          )
        : [...this.data];
    if (this.columnSort.length > 0) {
      filteredData.sort(
        multipleSortFunction(
          ...this.columnSort.map(c => ({
            property: c.property,
            display: c.display,
            direction: c.direction,
            compare: c.compare
          }))
        )
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
      if (this.totalPages <= this.maxPages) {
        this.pageNums = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      } else {
        let startPage = this.pageNum - Math.floor(this.maxPages / 2);
        if (startPage < 1) {
          startPage = 1;
        } else if (startPage > this.totalPages - this.maxPages + 1) {
          startPage = this.totalPages - this.maxPages + 1;
        }
        this.pageNums = Array.from({ length: this.maxPages }, (_, i) => i + startPage);
      }
    } else {
      this.pageNum = 1;
      this.totalPages = 1;
      this.start = 1;
      this.finish = filteredData.length;
    }
    if (this.groupBy && this.columnSort.every(column => this.groupBy.keys.some(key => key === column.property))) {
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
        column.direction =
          column.direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
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
