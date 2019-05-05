import { resolveProperty } from './resolve-property';

export interface Group {
  key: any;
  items: any[];
  sum?: any;
}

export interface GroupBy {
  keys: string[];
  sum?: string[];
  thenby?: GroupBy;
}

export const totalRowItem = (obj: any, prop: string) => {
  const val = resolveProperty(obj, prop);
  return val === undefined ? val : { tableCellValue: val, cssClass: 'total' };
};

export const flattenGroup = (group: Group): any[] => {
  const items =
    group.items.length && group.items[0] && group.items[0].key && group.items[0].items
      ? flattenGroups(group.items)
      : group.items;

  const flattenedItems = items.reduce((array, item, index) => {
    const rows = index ? -1 : items.length;
    const merged = Object.getOwnPropertyNames(group.key).reduce((o, prop) => {
      o[prop] = group.key[prop];
      o._rows[prop] = rows;
      return o;
    }, { _rows: {} });
    array.push({ ...merged, ...item });
    return array;
  }, []);
  return group.sum && flattenedItems && flattenedItems.length
    ? [
        ...flattenedItems,
        Object.getOwnPropertyNames(flattenedItems[0]).reduce((o, prop) => {
          o[prop] = totalRowItem(group.sum, prop);
          return o;
        }, {})
      ]
    : flattenedItems;
};
export const flattenGroups = (groups: Group[]): any[] =>
  groups
    ? groups.reduce((array, group) => {
        flattenGroup(group).forEach(item => array.push(item));
        return array;
      }, [])
    : groups;

export const sumGroup = (group: Group, sum: string[]): Group => {
  if (!sum || !sum.length || !group) {
    return group;
  }
  return {
    ...group,
    sum: sum.reduce(
      (sumObj, sumProp) => ({
        ...sumObj,
        [sumProp]: group.items.reduce((a, b) => resolveProperty(a, sumProp) + resolveProperty(b, sumProp))
      }),
      {}
    )
  };
};

export const groupBy = (array: any[], grouping: GroupBy): Group[] => {
  if (!array) {
    return array;
  }
  const keys = grouping.keys;
  const groups: Group[] = array.reduce((results: Group[], item) => {
    const group = results.find(g => keys.every(key => item[key] === g.key[key]));
    const data = Object.getOwnPropertyNames(item).reduce((o, prop) => {
      if (!keys.some(key => key === prop)) {
        o[prop] = item[prop];
      }
      return o;
    }, {});
    if (group) {
      group.items.push(data);
    } else {
      results.push({
        key: keys.reduce((o, key) => {
          o[key] = item[key];
          return o;
        }, {}),
        items: [data]
      });
    }
    return results;
  }, []);
  return grouping.thenby
    ? groups.map(g => ({ ...g, items: groupBy(g.items, grouping.thenby) }))
    : groups.reduce((arr, g) => {
        arr.push(sumGroup(g, grouping.sum));
        return arr;
      }, []);
};
