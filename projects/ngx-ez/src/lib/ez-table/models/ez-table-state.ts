import { SortDirection } from 'ez-functions';

export interface EzTableState {
  pageNum: number;
  pageSize: 'All' | number;
  columnSort: { [property: string]: SortDirection };
}
