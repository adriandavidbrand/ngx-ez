import { multipleSortFunction, SortDirection } from './multiple-sort';

describe('multipleSort', () => {
  it('should sort array in ascending order of property specified', () => {
    const array = [{ name: 'a' }, { name: 'd' }, { name: 'c' }, { name: 'b' }];
    array.sort(multipleSortFunction('name'));
    expect(array).toEqual([{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }]);
  });

  it('should sort array in descending order of property specified', () => {
    const array = [{ name: 'a' }, { name: 'd' }, { name: 'c' }, { name: 'b' }];
    array.sort(multipleSortFunction({ property: 'name', direction: SortDirection.descending }));
    expect(array).toEqual([{ name: 'd' }, { name: 'c' }, { name: 'b' }, { name: 'a' }]);
  });

  it('should sort array in ascending order of first property specified and descending for second property specified', () => {
    const array = [
      { name: 'a', lastname: 'a' },
      { name: 'b', lastname: 'c' },
      { name: 'c', lastname: 'b' },
      { name: 'a', lastname: 'b' },
      { name: 'a', lastname: 'c' },
      { name: 'a', lastname: 'd' }
    ];
    array.sort(
      multipleSortFunction(
        { property: 'name', direction: SortDirection.ascending },
        { property: 'lastname', direction: SortDirection.descending }
      )
    );
    expect(array).toEqual([
      { name: 'a', lastname: 'd' },
      { name: 'a', lastname: 'c' },
      { name: 'a', lastname: 'b' },
      { name: 'a', lastname: 'a' },
      { name: 'b', lastname: 'c' },
      { name: 'c', lastname: 'b' }
    ]);
  });

  it('should sort array in ascending order of property specified', () => {
    const array = [{ name: '11' }, { name: '01' }, { name: '002' }, { name: '9' }];
    array.sort(multipleSortFunction({ property: 'name' }));
    expect(array).toEqual([{ name: '01' }, { name: '002' }, { name: '9' }, { name: '11' }]);
  });

  it('should sort array with compare function', () => {
    const array = [{ prop: 4 }, { prop: 2 }, { prop: 1 }, { prop: 3 }];
    array.sort(multipleSortFunction({ compare: (a, b) => a.prop - b.prop }));
    expect(array).toEqual([{ prop: 1 }, { prop: 2 }, { prop: 3 }, { prop: 4 }]);
  });
});
