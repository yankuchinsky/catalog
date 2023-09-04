export default function getNewRouterQueryParams(queryParams: { [key: string]: string | number }) {
  let queryString = '?';

  for (const key of Object.keys(queryParams)) {
    if (key && queryParams[key]) {
      queryString += `${key}=${queryParams[key]}&`;
    }
  }

  queryString = queryString.substring(0, queryString.length - 1);

  return queryString;
}
