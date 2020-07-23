import { pageNums } from './page-nums';

describe('pageNums', () => {
  it('one page should return single page', () => {
    const pages = pageNums(1, 1, 1);
    expect(pages).toEqual([1]);
  });

  it('5 pages should return 5 pages', () => {
    const pages = pageNums(5, 5, 5);
    expect(pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('max page size of 5 and page 1 should return 1 to 5', () => {
    const pages = pageNums(1, 10, 5);
    expect(pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('max page size of 5 and page 2 should return 1 to 5', () => {
    const pages = pageNums(2, 10, 5);
    expect(pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('max page size of 5 and page 5 should return 3 to 7', () => {
    const pages = pageNums(5, 10, 5);
    expect(pages).toEqual([3, 4, 5, 6, 7]);
  });

  it('max page size of 5 and page 10 should return 6 to 10', () => {
    const pages = pageNums(10, 10, 5);
    expect(pages).toEqual([6, 7, 8, 9, 10]);
  });
});
