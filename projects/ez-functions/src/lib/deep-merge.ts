export function deepMerge<T>(source: T, data: any): T;
export function deepMerge(source: any, data: any): any {
  if (
    typeof data !== 'object' ||
    !data ||
    !source ||
    Array.isArray(source) ||
    source instanceof Date
  ) {
    return data;
  }
  const sourceProps = Object.getOwnPropertyNames(source);
  const dataProps = Object.getOwnPropertyNames(data);
  return dataProps
    .filter((prop) => !sourceProps.includes(prop))
    .reduce(
      (result, prop) => {
        result[prop] = data[prop];
        return result;
      },
      sourceProps.reduce((result, prop) => {
        result[prop] = dataProps.includes(prop)
          ? deepMerge((source as any)[prop], (data as any)[prop])
          : (source as any)[prop];
        return result;
      }, {} as any)
    );
}
