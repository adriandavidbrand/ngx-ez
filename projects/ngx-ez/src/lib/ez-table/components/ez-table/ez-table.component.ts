import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  Output,
  AfterContentInit,
  OnDestroy,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { EzColumnComponent } from '../ez-column/ez-column.component';
import { EzFooterComponent } from '../ez-footer/ez-footer.component';
import { multipleSortFunction, SortDirection } from 'ez-functions';
import { resolveProperty } from 'ez-functions';
import { groupBy, GroupBy, flattenGroups } from 'ez-functions';
import { EzTableState } from '../../models/ez-table-state';
import { EzTableConfigService } from '../../services/ez-table-config.service';
import { EzHeadingComponent } from '../ez-heading/ez-heading.component';
import { pageNums } from '../../functions/page-nums';

@Component({
  selector: 'ez-table',
  templateUrl: './ez-table.component.html',
  styleUrls: ['./ez-table.component.scss'],
})
export class EzTableComponent implements AfterContentInit, OnDestroy, OnChanges {
  @Input()
  data: any[] = [];

  @Input()
  tableId = 'table';

  @Input()
  sortable = true;

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

  @Input()
  state: EzTableState;

  @Input()
  breakGrouping = true;

  @Output()
  stateChange = new EventEmitter<EzTableState>();

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
  initialised = false;

  @ContentChildren(EzHeadingComponent)
  headings: QueryList<EzHeadingComponent>;

  @ContentChildren(EzColumnComponent)
  columns: QueryList<EzColumnComponent>;

  @ContentChildren(EzFooterComponent)
  footers: QueryList<EzFooterComponent>;

  resolveProperty = resolveProperty;

  constructor(public config: EzTableConfigService) {}

  update(): void {
    if (!this.data) {
      this.pageData = [];
      this.totalRecords = 0;
      this.totalPages = 1;
      return;
    }
    const searchArray = this.search ? this.search.split(' ') : null;
    let filteredData =
      searchArray && searchArray.length
        ? this.data.filter((item) =>
            searchArray.every((search) => {
              const searchRegEx = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
              return this.columns.some((c) =>
                searchRegEx.test((c.display ? c.display(item) : resolveProperty(item, c.property)) || '')
              );
            })
          )
        : [...this.data];
    if (this.columnSort.length > 0) {
      filteredData.sort(
        multipleSortFunction(
          ...this.columnSort.map((c) => ({
            property: c.property,
            display: c.display,
            direction: c.direction,
            compare: c.compare,
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
      this.pageNums = pageNums(this.pageNum, this.totalPages, this.maxPages);
    } else {
      this.pageNum = 1;
      this.totalPages = 1;
      this.start = 1;
      this.finish = filteredData.length;
    }
    if (
      this.groupBy &&
      (!this.breakGrouping ||
        this.columnSort.every(
          (column) => !column.breakGrouping || this.groupBy.keys.some((key) => key === column.property)
        ))
    ) {
      filteredData = flattenGroups(groupBy(filteredData, this.groupBy));
    }
    this.pageData = filteredData;
  }

  goto(pageNum: number): void {
    this.pageNum = pageNum;
    this.update();
  }

  next(): void {
    if (this.pageNum < this.totalPages) {
      this.pageNum++;
      this.update();
    }
  }

  last(): void {
    if (this.pageNum < this.totalPages) {
      this.pageNum = this.totalPages;
      this.update();
    }
  }

  previous(): void {
    if (this.pageNum > 1) {
      this.pageNum--;
      this.update();
    }
  }

  first(): void {
    if (this.pageNum !== 1) {
      this.pageNum = 1;
      this.update();
    }
  }

  headerClick(column: EzColumnComponent, event: MouseEvent): void {
    (event.target as HTMLElement).focus();
    this.sort(column, event.shiftKey);
  }

  sort(column: EzColumnComponent, multi: boolean): void {
    if (this.sortable && column.sortable) {
      const current = this.columnSort.find((c) => c === column);
      if (current) {
        column.direction =
          column.direction === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending;
      } else {
        column.direction = SortDirection.ascending;
      }
      if (!multi) {
        this.columnSort.forEach((c) => {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialised) {
      this.goto(1);
    }
  }

  ngAfterContentInit(): void {
    if (this.state) {
      this.pageSize = this.state.pageSize;
      this.pageNum = this.state.pageNum;
      this.columnSort = Object.keys(this.state.columnSort).reduce((columnSort, id) => {
        const column = this.columns.find((c) => c.id === id);
        if (column) {
          column.direction = this.state.columnSort[id];
          columnSort.push(column);
        }
        return columnSort;
      }, []);
    }
    this.update();
    this.initialised = true;
  }

  ngOnDestroy(): void {
    this.stateChange.emit({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      columnSort: this.columnSort.reduce((columnSort, column) => {
        if (column.id) {
          columnSort[column.id] = column.direction;
        }
        return columnSort;
      }, {}),
    });
  }
}
