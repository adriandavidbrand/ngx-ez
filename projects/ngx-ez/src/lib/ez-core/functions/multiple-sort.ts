import { defaultCompare } from './default-compare';

export enum SortDirection {
  ascending = 'ascending',
  descending = 'descending'
}

export interface SortProperty {
  property: string;
  direction?: SortDirection;
  compare?: (a: any, b: any) => number;
}

export const multipleSort = (array: any[], ...props: (string | SortProperty)[]): any[] => {
  array.sort((a: any, b: any) => {
    let direction = 0;

    props.some(item => {
      if (typeof item === 'string') {
        direction = defaultCompare(a[item], b[item]);
      } else {
        direction = item.compare
          ? item.compare(a[item.property], b[item.property])
          : defaultCompare(a[item.property], b[item.property]);
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
