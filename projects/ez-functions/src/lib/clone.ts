export const clone = <T>(obj: T): T =>
  Array.isArray(obj)
    ? obj.map((item) => clone(item))
    : obj instanceof Date
    ? new Date(obj.getTime())
    : obj && typeof obj === 'object'
    ? Object.getOwnPropertyNames(obj).reduce((o, prop) => {
        o[prop] = clone((obj as any)[prop]);
        return o;
      }, {} as any)
    : obj;
