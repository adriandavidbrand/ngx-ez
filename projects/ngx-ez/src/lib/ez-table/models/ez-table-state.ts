import { SortDirection } from 'ez-functions';

export interface EzTableState {
  pageNum: number;
  pageSize: string | number;
  columnSort: { [property: string]: SortDirection };
}
