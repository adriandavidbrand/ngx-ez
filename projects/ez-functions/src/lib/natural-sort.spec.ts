import { naturalSort } from './natural-sort';

describe('naturalSort', () => {
  it('empty string should equal empty string', () => {
    expect(naturalSort('', '')).toEqual(0);
  });

  it('empty string should equal null', () => {
    expect(naturalSort('', null)).toEqual(0);
  });

  it('null should equal empty string', () => {
    expect(naturalSort(null, '')).toEqual(0);
  });

  it('empty string should be less than non empty string', () => {
    expect(naturalSort('', 'a')).toEqual(-1);
  });

  it('non empty string should be greater than empty string', () => {
    expect(naturalSort('a', '')).toEqual(1);
  });
});
