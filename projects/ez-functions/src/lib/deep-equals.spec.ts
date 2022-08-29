import { deepEquals } from './deep-equals';

describe('deepEquals', () => {
  it('same reference should be equal', () => {
    const obj = {};
    expect(deepEquals(obj, obj)).toBeTrue();
  });

  it('undefined should be equal', () => {
    expect(deepEquals(undefined, undefined)).toBeTrue();
  });

  it('undefined and null should not be equal', () => {
    expect(deepEquals(undefined, null)).toBeFalse();
  });

  it('no properties should be equal', () => {
    expect(deepEquals({}, {})).toBeTrue();
  });

  it('same properties with same values should be equal', () => {
    expect(deepEquals({ prop1: 1 }, { prop1: 1 })).toBeTrue();
  });

  it('same properties with different values should not be equal', () => {
    expect(deepEquals({ prop1: 1 }, { prop1: 2 })).toBeFalse();
  });

  it('same properties with same values in different order should be equal', () => {
    expect(
      deepEquals({ prop1: 1, prop2: 2 }, { prop2: 2, prop1: 1 })
    ).toBeTrue();
  });

  it('nested properties with same values should be equal', () => {
    expect(
      deepEquals(
        { prop1: 1, obj: { subProp: 'prop' }, arr: ['some value'] },
        { prop1: 1, obj: { subProp: 'prop' }, arr: ['some value'] }
      )
    ).toBeTrue();
  });

  it('nested properties with different values should not be equal', () => {
    expect(
      deepEquals(
        { prop1: 1, obj: { subProp: 'prop' }, arr: ['some other value'] },
        { prop1: 1, obj: { subProp: 'prop' }, arr: ['some value'] }
      )
    ).toBeFalse();
  });

  it('different properties should not be equal', () => {
    expect(deepEquals({ prop: 1 }, { prop1: 1 })).toBeFalse();
  });

  it('empty array should be equal', () => {
    expect(deepEquals([], [])).toBeTrue();
  });

  it('array with same values should be equal', () => {
    expect(deepEquals([1, 2, 3], [1, 2, 3])).toBeTrue();
  });

  it('array with values in different order should not be equal', () => {
    expect(deepEquals([1, 2, 3], [1, 3, 2])).toBeFalse();
  });

  it('array with different values should not be equal', () => {
    expect(deepEquals([1, 2, 4], [1, 2, 3])).toBeFalse();
  });

  it('array with different lengths should not be equal', () => {
    expect(deepEquals([1, 2, 3], [1, 2, 3, 4])).toBeFalse();
  });
});
