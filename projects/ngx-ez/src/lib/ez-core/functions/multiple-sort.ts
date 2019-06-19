import { naturalSort } from './natural-sort';
import { resolveProperty } from './resolve-property';

export enum SortDirection {
  ascending = 'ascending',
  descending = 'descending'
}

export interface SortProperty {
  property?: string;
  display?: (item: any) => string;
  direction?: SortDirection;
  compare?: (a: any, b: any) => number;
}

export const multipleSort = (array: any[], ...props: (string | SortProperty)[]): any[] => {
  array.sort((a: any, b: any) => {
    let direction = 0;

    props.some(item => {
      if (typeof item === 'string') {
        direction = naturalSort(resolveProperty(a, item), resolveProperty(b, item));
      } else {
        const aVal = item.display ? item.display(a) : resolveProperty(a, item.property);
        const bVal = item.display ? item.display(b) : resolveProperty(b, item.property);
        direction = item.compare ? item.compare(aVal, bVal) : naturalSort(aVal, bVal);
        if (direction && item.direction === SortDirection.descending) {
          direction = -direction;
        }
      }
      return direction !== 0;
    });

    return direction;
  });
  return array || [];
};
