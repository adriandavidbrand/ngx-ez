import { defaultSort } from './default-sort';

describe('default-compare', () => {
  it('undefined and null should be zero', () => {
    const value = defaultSort(undefined, null);
    expect(value).toEqual(0);
  });

  it('null should be less than 1', () => {
    const value = defaultSort(null, 1);
    expect(value).toEqual(-1);
  });

  it('1 should be greater than null', () => {
    const value = defaultSort(1, null);
    expect(value).toEqual(1);
  });

  it('1 should equal 1', () => {
    const value = defaultSort(1, 1);
    expect(value).toEqual(0);
  });

  it('1 be less than 2', () => {
    const value = defaultSort(1, 2);
    expect(value).toEqual(-1);
  });

  it('2 should be greater than 1', () => {
    const value = defaultSort(2, 1);
    expect(value).toEqual(1);
  });
});
