export interface Group {
  key: any;
  items?: any[];
  groups?: Group[];
  totalItems: number;
}

export interface GroupBy {
  keys: string[];
  thenby?: GroupBy;
}

export function groupBy(array: any[], key: string): Group[];
export function groupBy(array: any[], keys: string[]): Group[];
export function groupBy(array: any[], grouping: GroupBy): Group[];
export function groupBy(
  array: any[],
  keyOrKeysOrGrouping: string | string[] | GroupBy
): Group[] {
  const keys =
    typeof keyOrKeysOrGrouping === 'string'
      ? [keyOrKeysOrGrouping]
      : Array.isArray(keyOrKeysOrGrouping)
      ? keyOrKeysOrGrouping
      : keyOrKeysOrGrouping.keys;

  const thenby =
    typeof keyOrKeysOrGrouping !== 'string' &&
    !Array.isArray(keyOrKeysOrGrouping)
      ? keyOrKeysOrGrouping.thenby
      : undefined;

  const groups = array.reduce((results: Group[], item) => {
    const group = results.find((g) =>
      keys.every((key) => item[key] === g.key[key])
    );
    let data = {} as any;
    let groupKey = {} as any;
    Object.keys(item).forEach((key) => {
      if (!keys.some((k) => k === key)) {
        data[key] = item[key];
      } else if (!group) {
        groupKey[key] = item[key];
      }
    });
    if (group !== undefined) {
      group.items?.push(data);
      group.totalItems++;
    } else {
      results.push({ key: groupKey, items: [data], totalItems: 1 });
    }
    return results;
  }, []);
  return thenby
    ? groups.map((group) => ({
        key: group.key,
        groups: groupBy(group?.items ?? [], thenby),
        totalItems: group.totalItems,
      }))
    : groups;
}
