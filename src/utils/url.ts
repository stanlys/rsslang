export interface Serializable {
  toString: () => string;
}

export interface SearchParams {
  [key: string]: Serializable | undefined;
}

export const buildQueryString = (params: SearchParams): string => {
  const searchParams = new URLSearchParams();

  // eslint-disable-next-line no-restricted-syntax
  for (const paramKey of Object.keys(params)) {
    if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
      const paramValue = params[paramKey];

      if (paramValue !== undefined) {
        searchParams.append(paramKey, paramValue.toString());
      }
    }
  }

  let queryString = searchParams.toString();

  if (queryString) {
    queryString = `?${queryString}`;
  }

  return queryString;
};
