export const naturalSort = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare;
