import { multipleSort, SortDirection } from './multiple-sort';
import { naturalSort } from './natural-sort';

describe('multipleSort', () => {
  it('should be defined', () => {
    const sort = multipleSort([]);
    expect(sort).toBeDefined();
  });

  it('should sort empty array should return empty array', () => {
    const emptyArray = [];
    const result = multipleSort(emptyArray);
    expect(result.length).toEqual(0);
  });

  it('should sort array in ascending order of property specified', () => {
    const array = [{ name: 'a' }, { name: 'd' }, { name: 'c' }, { name: 'b' }];
    const result = multipleSort(array, 'name');
    expect(result).toEqual([{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }]);
  });

  it('should sort array in descending order of property specified', () => {
    const array = [{ name: 'a' }, { name: 'd' }, { name: 'c' }, { name: 'b' }];
    const result = multipleSort(array, { property: 'name', direction: SortDirection.descending });
    expect(result).toEqual([{ name: 'd' }, { name: 'c' }, { name: 'b' }, { name: 'a' }]);
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
    const result = multipleSort(
      array,
      { property: 'name', direction: SortDirection.ascending },
      { property: 'lastname', direction: SortDirection.descending }
    );
    expect(result).toEqual([
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
    const result = multipleSort(array, { property: 'name', compare: naturalSort });
    expect(result).toEqual([{ name: '01' }, { name: '002' }, { name: '9' }, { name: '11' }]);
  });
});
