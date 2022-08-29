export const deepEquals = (obj1: any, obj2: any): boolean =>
  obj1 === obj2 ||
  (Array.isArray(obj1)
    ? Array.isArray(obj2) &&
      obj1.length === obj2.length &&
      obj1.every((item: any, index: number) => deepEquals(item, obj2[index]))
    : obj1 instanceof Date
    ? obj2 instanceof Date && obj1.getDate() === obj2.getDate()
    : obj1 && typeof obj1 === 'object'
    ? obj2 &&
      typeof obj2 === 'object' &&
      Object.getOwnPropertyNames(obj1).length ===
        Object.getOwnPropertyNames(obj2).length &&
      Object.getOwnPropertyNames(obj1).every((prop) =>
        deepEquals(obj1[prop], obj2[prop])
      )
    : obj1 === obj2);
