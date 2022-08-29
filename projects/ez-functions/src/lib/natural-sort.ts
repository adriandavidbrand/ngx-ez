const sort = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
}).compare;

export const naturalSort = (a: any, b: any) =>
  !a && !b ? 0 : !a ? -1 : !b ? 1 : sort(a, b);
