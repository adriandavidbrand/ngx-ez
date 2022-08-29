import { dateSort } from './date-sort';

describe('dateSort', () => {
  it('undefined and null should be zero', () => {
    const value = dateSort(undefined as any, null as any);
    expect(value).toEqual(0);
  });

  it('null should be less than now', () => {
    const value = dateSort(null as any, new Date());
    expect(value).toBeLessThan(0);
  });

  it('now should be greater than null', () => {
    const value = dateSort(new Date(), null as any);
    expect(value).toBeGreaterThan(0);
  });

  it('now should equal now', () => {
    const now = new Date();
    const value = dateSort(now, now);
    expect(value).toEqual(0);
  });

  it('now should be less than an hour from now', () => {
    const now = new Date();
    const hourFromNow = new Date(now.getTime() + 3600000);
    const value = dateSort(now, hourFromNow);
    expect(value).toBeLessThan(0);
  });

  it('an hour from now should be greater than now', () => {
    const now = new Date();
    const hourFromNow = new Date(now.getTime() + 3600000);
    const value = dateSort(hourFromNow, now);
    expect(value).toBeGreaterThan(0);
  });
});
