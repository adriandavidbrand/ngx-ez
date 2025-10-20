export const clone = <T>(obj: T): T =>
  Array.isArray(obj)
    ? (obj.map((item) => clone(item)) as T)
    : obj instanceof Date
    ? (new Date(obj.getTime()) as T)
    : obj && typeof obj === 'object'
    ? Object.getOwnPropertyNames(obj).reduce((o, prop) => {
        o[prop] = clone((obj as any)[prop]);
        return o;
      }, {} as any)
    : obj;
