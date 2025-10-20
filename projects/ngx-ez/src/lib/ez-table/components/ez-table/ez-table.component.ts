import {
  Component,
  Input,
  Output,
  AfterContentInit,
  OnDestroy,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  input,
  model,
  linkedSignal,
  contentChildren,
} from '@angular/core';

import { EzColumnComponent } from '../ez-column/ez-column.component';
import { EzFooterComponent } from '../ez-footer/ez-footer.component';
import { EzTableState } from '../../models/ez-table-state';
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
export class EzTableComponent<T> implements AfterContentInit, OnDestroy, OnChanges {
  readonly data = input<T[]>([]);

  readonly tableId = input.required<string>();

  readonly sortable = input(true);

  readonly loading = input(false);

  readonly loadingRows = input(5);

  groupBy = input(undefined, {
    transform: (value: string | GroupBy) => (typeof value === 'string' ? { keys: value.split(' ') } : value),
  });

  readonly pageSizes = input<(number | string)[]>([5, 10, 25, 50, 'All']);

  pageSize = input('All', {
    transform: (value: string | number) => (typeof value === 'string' && value !== 'All' ? parseInt(value) : value),
  });

  currentPageSize = linkedSignal(() => this.pageSize());

  readonly maxPages = input(10);

  readonly noDataMessage = input(this.config.messages.noData);

  private propertySorting: {
    columnId: string | null | undefined;
    direction: SortDirection;
    changed: boolean;
  } = {
    columnId: null,
    direction: SortDirection.ascending,
    changed: false,
  };

  @Input()
  set sortId(id: string | null | undefined) {
    if (this.propertySorting.columnId !== id) {
      this.propertySorting.changed = true;
    }
    this.propertySorting.columnId = id;
  }

  @Input()
  set sortDirection(direction: SortDirection) {
    if (this.propertySorting.direction !== direction) {
      this.propertySorting.changed = true;
    }
    this.propertySorting.direction = direction;
  }

  readonly search = model('');

  readonly state = input<EzTableState>();

  readonly breakGrouping = input(true);

  @Output()
  rowClick = new EventEmitter();

  @Output()
  cellClick = new EventEmitter();

  @Output()
  stateChange = new EventEmitter<EzTableState>();

  pageData = [] as any[];

  columnSort: EzColumnComponent[] = [];

  pageNum = 1;
  pageNums = [] as number[];
  filteredPageNums = [];
  totalPages = 0;
  totalRecords = 0;
  start = 0;
  finish = 0;
  initialised = false;

  headings = contentChildren(EzHeadingComponent);

  columns = contentChildren(EzColumnComponent);

  footers = contentChildren(EzFooterComponent);

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
    if (this.sortable() && column.sortable) {
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

  private propertySort() {
    const id = this.propertySorting.columnId;
    const column = id ? this.columns().find((c) => c.id() === id) : undefined;
    this.columnSort.forEach((c) => {
      if (c !== column && c.direction) {
        delete c.direction;
      }
    });
    if (column) {
      column.direction = this.propertySorting.direction;
      this.columnSort = [column];
    } else {
      this.columnSort = [];
    }
    this.propertySorting.changed = false;
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.initialised) {
      if (this.propertySorting.changed) {
        this.propertySort();
        this.update();
      } else {
        this.goto(1);
      }
    }
  }

  ngAfterContentInit(): void {
    const state = this.state();
    if (state) {
      this.currentPageSize.set(state.pageSize);
      this.pageNum = state.pageNum;
      this.columnSort = Object.keys(state.columnSort).reduce((columnSort, id) => {
        const column = this.columns().find((c) => c.id() === id);
        if (column) {
          column.direction = this.state()?.columnSort[id];
          columnSort.push(column);
        }
        return columnSort;
      }, [] as EzColumnComponent[]);
    } else if (this.propertySorting.changed) {
      this.propertySort();
    }
    this.update();
    this.initialised = true;
  }

  ngOnDestroy(): void {
    this.stateChange.emit({
      pageNum: this.pageNum,
      pageSize: this.currentPageSize(),
      columnSort: this.columnSort.reduce((columnSort, column) => {
        const id = column.id();
        if (id) {
          columnSort[id] = column.direction;
        }
        return columnSort;
      }, {} as any),
    });
  }
}
