import { naturalSort } from './natural-sort';
import { resolveProperty } from './resolve-property';

export enum SortDirection {
  ascending = 'ascending',
  descending = 'descending',
}

export interface SortProperty {
  property?: string;
  display?: (item: any) => string;
  direction?: SortDirection;
  compare?: (a: any, b: any) => number;
}

export const multipleSortFunction = (...props: (string | SortProperty)[]) => {
  return (a: any, b: any) => {
    let direction = 0;

    props.some((item) => {
      if (typeof item === 'string') {
        direction = naturalSort(resolveProperty(a, item), resolveProperty(b, item));
      } else {
        direction = item.compare
          ? item.display
            ? item.compare(item.display(a), item.display(b))
            : item.property
            ? item.compare(resolveProperty(a, item.property), resolveProperty(b, item.property))
            : item.compare(a, b)
          : item.display
          ? naturalSort(item.display(a), item.display(b))
          : naturalSort(resolveProperty(a, item.property), resolveProperty(b, item.property));
        if (direction && item.direction === SortDirection.descending) {
          direction = -direction;
        }
      }
      return direction !== 0;
    });

    return direction;
  };
};
