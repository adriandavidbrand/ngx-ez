import { deepMerge } from './deep-merge';

describe('deepMerge', () => {
  it('no data should return undefined', () => {
    expect(deepMerge({}, undefined)).toBeUndefined();
  });

  it('no source should return data', () => {
    expect(deepMerge(undefined as undefined | string, 'data')).toEqual('data');
  });

  it('reference source should return data', () => {
    expect(deepMerge('', 'data')).toEqual('data');
  });

  it('array source should return data', () => {
    expect(deepMerge([] as [] | string, 'data')).toEqual('data');
  });

  it('date source should return data', () => {
    expect(deepMerge(new Date(), new Date('2020-01-01'))).toEqual(
      new Date('2020-01-01')
    );
  });

  it('should merge top level properties', () => {
    expect(deepMerge({ a: 1, b: 1 }, { a: 2 })).toEqual({ a: 2, b: 1 });
  });

  it('should add top level properties', () => {
    expect(deepMerge({}, { a: 1 })).toEqual({ a: 1 });
  });

  it('should merge nested properties', () => {
    expect(deepMerge({ a: { nested: 1 }, b: 1 }, { a: { nested: 2 } })).toEqual(
      { a: { nested: 2 }, b: 1 }
    );
  });
});
