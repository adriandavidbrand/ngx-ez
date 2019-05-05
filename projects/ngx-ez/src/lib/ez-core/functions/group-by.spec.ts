import { groupBy, flattenGroups } from './group-by';

describe('groupBy', () => {
  it('should be undefined', () => {
    const groups = groupBy(undefined, { keys: [] });
    expect(groups).toBeUndefined();
  });

  it('should be null', () => {
    const groups = groupBy(null, { keys: [] });
    expect(groups).toBeNull();
  });

  it('empty array should return empty array', () => {
    const groups = groupBy([], { keys: [] });
    expect(groups.length).toEqual(0);
  });

  it('there should be 1 group', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 1 }], { keys: ['prop1'] });
    expect(groups.length).toEqual(1);
  });

  it('there should be 2 groups', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 2 }], { keys: ['prop1'] });
    expect(groups.length).toEqual(2);
  });
});

describe('flattenGroups', () => {
  it('should be undefined', () => {
    const array = flattenGroups(undefined);
    expect(array).toBeUndefined();
  });

  it('should be null', () => {
    const array = flattenGroups(null);
    expect(array).toBeNull();
  });

  it('empty array should return empty array', () => {
    const array = flattenGroups([]);
    expect(array.length).toEqual(0);
  });

  it('should span 2 rows', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 1 }], { keys: ['prop1'] });
    const array = flattenGroups(groups);
    expect(array[0]._rows.prop1).toEqual(2);
  });

  it('should span -1 rows', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 1 }], { keys: ['prop1'] });
    const array = flattenGroups(groups);
    expect(array[1]._rows.prop1).toEqual(-1);
  });

  it('should span 1 row', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 2 }], { keys: ['prop1'] });
    const array = flattenGroups(groups);
    expect(array[0]._rows.prop1).toEqual(1);
  });
});
