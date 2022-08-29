import { Group } from './group-by';

export const flattenGroup = (group: Group): any[] => {
  const items = group.items ?? flattenGroups(group.groups ?? []);
  return items.reduce((results, item, index) => {
    const keyRowspan = index ? -1 : group.totalItems;
    const rows = {} as any;
    Object.keys(group.key).forEach((key) => {
      rows[key] = keyRowspan;
    });
    Object.keys(item).forEach((key) => {
      rows[key] = 1;
    });
    results.push({
      ...group.key,
      ...item,
      _rows: rows,
    });
    return results;
  }, []);
};

export const flattenGroups = (groups: Group[]): any[] =>
  groups.reduce(
    (results, group) => results.concat(flattenGroup(group)),
    [] as any[]
  );
