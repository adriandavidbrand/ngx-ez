export const deepMerge = <T>(source: T, data: any): T => {
  if (typeof data !== 'object' || !data || !source || Array.isArray(source) || source instanceof Date) {
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
        result[prop] = dataProps.includes(prop) ? deepMerge(source[prop], data[prop]) : source[prop];
        return result;
      }, {})
    ) as T;
};
