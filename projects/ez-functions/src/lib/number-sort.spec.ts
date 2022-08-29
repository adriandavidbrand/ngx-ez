import { numberSort } from './number-sort';

describe('default-sort', () => {
  it('undefined and null should be zero', () => {
    const value = numberSort(undefined, null);
    expect(value).toEqual(0);
  });

  it('null should be less than 1', () => {
    const value = numberSort(null, 1);
    expect(value).toEqual(-1);
  });

  it('1 should be greater than null', () => {
    const value = numberSort(1, null);
    expect(value).toEqual(1);
  });

  it('1 should equal 1', () => {
    const value = numberSort(1, 1);
    expect(value).toEqual(0);
  });

  it('1 be less than 2', () => {
    const value = numberSort(1, 2);
    expect(value).toEqual(-1);
  });

  it('2 should be greater than 1', () => {
    const value = numberSort(2, 1);
    expect(value).toEqual(1);
  });
});
