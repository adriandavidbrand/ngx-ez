import { defaultCompare } from './default-compare';

describe('flatten', () => {
  it('undefined and null should be zero', () => {
    const value = defaultCompare(undefined, null);
    expect(value).toEqual(0);
  });

  it('null should be less than 1', () => {
    const value = defaultCompare(null, 1);
    expect(value).toEqual(-1);
  });

  it('1 should be greater than null', () => {
    const value = defaultCompare(1, null);
    expect(value).toEqual(1);
  });

  it('1 should equal 1', () => {
    const value = defaultCompare(1, 1);
    expect(value).toEqual(0);
  });

  it('1 be less than 2', () => {
    const value = defaultCompare(1, 2);
    expect(value).toEqual(-1);
  });

  it('2 should be greater than 1', () => {
    const value = defaultCompare(2, 1);
    expect(value).toEqual(1);
  });
});
