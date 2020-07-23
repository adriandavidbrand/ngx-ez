import { SortDirection } from '../../ez-core/functions';

export interface EzTableState {
  pageNum: number;
  pageSize: string | number;
  columnSort: { [property: string]: SortDirection };
}
