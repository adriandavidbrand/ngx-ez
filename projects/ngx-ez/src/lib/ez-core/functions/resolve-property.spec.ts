import { resolveProperty } from './resolve-property';

describe('resolveProperty', () => {
  it('should be undefined on undefined', () => {
    const prop = resolveProperty(undefined, 'prop');
    expect(prop).toBeUndefined();
  });

  it('should be undefined on null', () => {
    const prop = resolveProperty(null, 'prop');
    expect(prop).toBeUndefined();
  });

  it('non existing property should be undefined', () => {
    const prop = resolveProperty({}, 'prop');
    expect(prop).toBeUndefined();
  });

  it('should find first level property', () => {
    const prop = resolveProperty({ prop: 'value' }, 'prop');
    expect(prop).toEqual('value');
  });

  it('should find second level property', () => {
    const prop = resolveProperty({ obj: { prop: 'value' } }, 'obj.prop');
    expect(prop).toEqual('value');
  });
});
