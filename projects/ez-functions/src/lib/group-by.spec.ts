import { groupBy } from './group-by';

describe('groupBy', () => {
  it('should return empty array', () => {
    const groups = groupBy([], '');
    expect(groups).toEqual([]);
  });

  it('should group by key', () => {
    const groups = groupBy(
      [
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ],
      'a'
    );
    expect(groups).toEqual([
      { key: { a: 1 }, items: [{ b: 1 }, { b: 2 }], totalItems: 2 },
    ]);
  });

  it('should group by keys', () => {
    const groups = groupBy(
      [
        { a: 1, b: 1, c: 1 },
        { a: 1, b: 1, c: 2 },
        { a: 2, b: 1, c: 3 },
      ],
      ['a', 'b']
    );
    expect(groups).toEqual([
      { key: { a: 1, b: 1 }, items: [{ c: 1 }, { c: 2 }], totalItems: 2 },
      { key: { a: 2, b: 1 }, items: [{ c: 3 }], totalItems: 1 },
    ]);
  });

  it('should group by thenby', () => {
    const groups = groupBy(
      [
        { a: 1, b: 1, c: 1, d: 1 },
        { a: 1, b: 1, c: 1, d: 2 },
        { a: 1, b: 2, c: 1, d: 3 },
      ],
      { keys: ['a', 'b'], thenby: { keys: ['c'] } }
    );
    expect(groups).toEqual([
      {
        key: { a: 1, b: 1 },
        groups: [{ key: { c: 1 }, items: [{ d: 1 }, { d: 2 }], totalItems: 2 }],
        totalItems: 2,
      },
      {
        key: { a: 1, b: 2 },
        groups: [{ key: { c: 1 }, items: [{ d: 3 }], totalItems: 1 }],
        totalItems: 1,
      },
    ]);
  });
});
