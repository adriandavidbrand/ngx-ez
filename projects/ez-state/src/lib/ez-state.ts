export interface EzState<T> {
  value: T;
  loading?: boolean;
  loaded?: boolean;
  loadError?: any;
  saving?: boolean;
  saved?: boolean;
  saveError?: any;
  updating?: boolean;
  updated?: boolean;
  updateError?: any;
  deleting?: boolean;
  deleted?: boolean;
  deleteError?: any;
  pollError?: any;
}
