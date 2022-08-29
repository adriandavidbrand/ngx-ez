export const defaultSort = (a: any, b: any) => (!a && !b ? 0 : !a ? -1 : !b ? 1 : a < b ? -1 : a > b ? 1 : 0);
