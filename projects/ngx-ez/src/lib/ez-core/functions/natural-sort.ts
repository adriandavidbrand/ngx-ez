const sort = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare;

export const naturalSort = (a: any, b: any) => (a === '' ? (b ? 1 : 0) : b === '' ? (a ? -1 : 0) : sort(a, b));
