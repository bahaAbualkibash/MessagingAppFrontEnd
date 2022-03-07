import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from '../models/pagination';

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((response) => {
      paginatedResult.result = <T>response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(
          <string>response.headers.get('Pagination')
        );
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', <string>pageNumber?.toString());
  params = params.append('pageSize', <string>pageSize?.toString());
  return params;
}
