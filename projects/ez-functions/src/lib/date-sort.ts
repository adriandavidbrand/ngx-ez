export const dateSort = (a: Date, b: Date) => (!a && !b ? 0 : !a ? -1 : !b ? 1 : a.getTime() - b.getTime());
