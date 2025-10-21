import {
  Component,
  Output,
  EventEmitter,
  input,
  model,
  linkedSignal,
  contentChildren,
  signal,
  computed,
} from '@angular/core';

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

  readonly pageNum = signal(1);

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
      columns: [...this.columns()],
    }),
    computation: (source) => {
      const id = source.sortId;
      const column = id ? source.columns.find((c) => c.id() === id) : undefined;
      source.columns.forEach((c) => {
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

  readonly filteredData = computed(() => {
    const data = this.data();
    const searchValue = this.search();
    const searchArray = searchValue ? searchValue.split(' ') : null;
    return searchArray && searchArray.length
      ? data.filter((item) =>
          searchArray.every((search) => {
            const searchRegEx = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
            return this.columns().some((c) => {
              return searchRegEx.test(resolveProperty(item, c.property()) || '');
            });
          })
        )
      : [...data];
  });

  readonly sortedData = computed(() =>
    this.columnSort().length > 0
      ? [...this.filteredData()].sort(
          multipleSortFunction(
            ...this.columnSort().map((c) => ({
              property: c.property(),
              direction: c.sortDirection(),
              compare: c.compare(),
            }))
          )
        )
      : this.filteredData()
  );

  readonly totalRecords = computed(() => this.sortedData().length);

  readonly multiPage = computed(() => {
    const pageSize = this.currentPageSize();
    return typeof pageSize !== 'string' && pageSize < this.totalRecords();
  });

  readonly start = computed(() => (this.multiPage() ? Number(this.currentPageSize()) * (this.pageNum() - 1) + 1 : 1));
  readonly finish = computed(() => {
    if (this.multiPage()) {
      const finish = this.start() + Number(this.currentPageSize());
      const totalRecords = this.totalRecords();
      return totalRecords < finish ? totalRecords : finish;
    }
    return 1;
  });

  readonly totalPages = computed(() => {
    if (this.multiPage()) {
      const pageSize = Number(this.currentPageSize());
      const totalRecords = this.totalRecords();
      return Math.floor(totalRecords / pageSize) + (totalRecords % pageSize === 0 ? 0 : 1);
    }
    return 1;
  });

  readonly pageNums = computed(() => pageNums(this.pageNum(), this.totalPages(), this.maxPages()));

  readonly pageData = computed(() => {
    const pageData = this.multiPage()
      ? this.sortedData().filter((_, i) => i >= this.start() - 1 && i < this.finish())
      : this.sortedData();
    return this.groupBy() &&
      (!this.breakGrouping() ||
        this.columnSort().every(
          (column) => !column.breakGrouping() || this.groupBy()?.keys.some((key) => key === column.property())
        ))
      ? flattenGroups(groupBy(pageData, this.groupBy() as GroupBy))
      : pageData;
  });

  resolveProperty = resolveProperty;

  constructor(public config: EzTableConfigService) {}

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
