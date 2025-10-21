import { Component, Output, EventEmitter, input, model, linkedSignal, contentChildren, signal } from '@angular/core';

import { EzColumnComponent } from '../ez-column/ez-column.component';
import { EzFooterComponent } from '../ez-footer/ez-footer.component';
import { EzTableConfigService } from '../../services/ez-table-config.service';
import { EzHeadingComponent } from '../ez-heading/ez-heading.component';
import { pageNums } from 'ez-functions';
import { flattenGroups } from 'ez-functions';
import { groupBy, GroupBy } from 'ez-functions';
import { resolveProperty } from 'ez-functions';
import { multipleSortFunction, SortDirection } from 'ez-functions';

@Component({
  selector: 'ez-table',
  templateUrl: './ez-table.component.html',
  styleUrls: ['./ez-table.component.scss'],
  standalone: false,
})
export class EzTableComponent<T> {
  readonly data = input<T[]>([]);

  readonly tableId = input.required<string>();

  readonly sortable = input(true);

  readonly groupBy = input(undefined, {
    transform: (value: string | GroupBy) => (typeof value === 'string' ? { keys: value.split(' ') } : value),
  });

  readonly pageSizes = input<(number | string)[]>([5, 10, 25, 50, 'All']);

  readonly pageSize = input('All', {
    transform: (value: string | number) => (typeof value === 'string' && value !== 'All' ? parseInt(value) : value),
  });

  readonly currentPageSize = linkedSignal(() => this.pageSize());

  readonly maxPages = input(10);

  readonly noDataMessage = input(this.config.messages.noData);

  readonly sortId = input<string>();

  readonly sortDirection = input<SortDirection>();

  readonly search = model('');

  readonly breakGrouping = input(true);

  @Output()
  rowClick = new EventEmitter();

  @Output()
  cellClick = new EventEmitter();

  pageData = [] as any[];

  pageNum = signal(1);
  pageNums = signal<number[]>([]);
  totalPages = signal(0);
  totalRecords = signal(0);
  start = signal(0);
  finish = signal(0);

  headings = contentChildren(EzHeadingComponent);

  columns = contentChildren(EzColumnComponent);

  footers = contentChildren(EzFooterComponent);

  columnSort = linkedSignal<
    { sortId: string | undefined; sortDirection: SortDirection | undefined; columns: EzColumnComponent[] },
    EzColumnComponent[]
  >({
    source: () => ({
      sortId: this.sortId(),
      sortDirection: this.sortDirection(),
      columns: this.columns(),
    }),
    compute: (
      source: { sortId: string | undefined; sortDirection: SortDirection; columns: EzColumnComponent[] },
      previous: EzColumnComponent[]
    ) => {
      const id = source.sortId;
      const column = id ? source.columns.find((c) => c.id() === id) : undefined;
      previous.forEach((c) => {
        if (c !== column && c.sortDirection()) {
          c.sortDirection.set(undefined);
        }
      });
      if (column) {
        column.sortDirection.set(source.sortDirection);
        return [column];
      } else {
        return [];
      }
    },
  });

  resolveProperty = resolveProperty;

  constructor(public config: EzTableConfigService) {}

  update(): void {
    const data = this.data();
    if (!data) {
      this.pageData = [];
      this.totalRecords = 0;
      this.totalPages = 1;
      return;
    }
    const searchValue = this.search();
    const searchArray = searchValue ? searchValue.split(' ') : null;
    let filteredData =
      searchArray && searchArray.length
        ? data.filter((item) =>
            searchArray.every((search) => {
              const searchRegEx = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
              return this.columns().some((c) => {
                return searchRegEx.test(resolveProperty(item, c.property()) || '');
              });
            })
          )
        : [...data];
    if (this.columnSort.length > 0) {
      filteredData.sort(
        multipleSortFunction(
          ...this.columnSort.map((c) => ({
            property: c.property(),
            direction: c.direction,
            compare: c.compare(),
          }))
        )
      );
    }
    const pageSize = this.currentPageSize();
    this.totalRecords = filteredData.length;
    if (typeof pageSize !== 'string' && pageSize < filteredData.length) {
      this.start = pageSize * (this.pageNum - 1) + 1;
      this.finish = this.start + pageSize - 1;
      if (this.finish > filteredData.length) {
        this.finish = filteredData.length;
      }
      this.totalPages = Math.floor(filteredData.length / pageSize) + (filteredData.length % pageSize === 0 ? 0 : 1);
      filteredData = filteredData.filter((_, i) => i >= this.start - 1 && i < this.finish);
      this.pageNums = pageNums(this.pageNum, this.totalPages, this.maxPages());
    } else {
      this.pageNum = 1;
      this.totalPages = 1;
      this.start = 1;
      this.finish = filteredData.length;
    }
    if (
      this.groupBy() &&
      (!this.breakGrouping() ||
        this.columnSort.every(
          (column) => !column.breakGrouping() || this.groupBy()?.keys.some((key) => key === column.property())
        ))
    ) {
      filteredData = flattenGroups(groupBy(filteredData, this.groupBy() as GroupBy));
    }
    this.pageData = filteredData;
  }

  goto(pageNum: number): void {
    this.pageNum.set(pageNum);
  }

  next(): void {
    if (this.pageNum < this.totalPages) {
      this.pageNum.update((value) => value + 1);
    }
  }

  last(): void {
    if (this.pageNum() < this.totalPages()) {
      this.pageNum.set(this.totalPages());
    }
  }

  previous(): void {
    if (this.pageNum() > 1) {
      this.pageNum.update((value) => value - 1);
    }
  }

  first(): void {
    if (this.pageNum() !== 1) {
      this.pageNum.set(1);
    }
  }

  headerClick(column: EzColumnComponent, event: MouseEvent): void {
    (event.target as HTMLElement).focus();
    this.sort(column, event.shiftKey);
  }

  sort(column: EzColumnComponent, multi: boolean): void {
    if (this.sortable() && column.sortable()) {
      const current = this.columnSort().find((c) => c === column);
      if (current) {
        column.sortDirection.update((sortDirection) =>
          sortDirection === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending
        );
      } else {
        column.sortDirection.set(SortDirection.ascending);
      }
      if (!multi) {
        this.columnSort().forEach((c) => {
          if (c !== column && c.sortDirection()) {
            c.sortDirection.set(undefined);
          }
        });
        this.columnSort.set([column]);
      } else if (!current) {
        this.columnSort.update((columns) => [...columns, column]);
      }
    }
  }
}
