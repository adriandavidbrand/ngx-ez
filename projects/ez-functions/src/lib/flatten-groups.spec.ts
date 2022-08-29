import { groupBy } from './group-by';
import { flattenGroups } from './flatten-groups';

describe('flattenGroups', () => {
  it('should span 2 rows', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 1 }], 'prop1');
    const array = flattenGroups(groups);
    expect(array[0]._rows.prop1).toEqual(2);
  });

  it('should span -1 rows', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 1 }], 'prop1');
    const array = flattenGroups(groups);
    expect(array[1]._rows.prop1).toEqual(-1);
  });

  it('should span 1 row', () => {
    const groups = groupBy([{ prop1: 1 }, { prop1: 2 }], 'prop1');
    const array = flattenGroups(groups);
    expect(array[0]._rows.prop1).toEqual(1);
  });
});
