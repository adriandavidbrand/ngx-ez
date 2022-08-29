export const resolveProperty = (obj: any, property?: string): any =>
  property
    ? property
        .split('.')
        .reduce((result, prop) => (result ? result[prop] : undefined), obj)
    : undefined;
