import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  userAuth(user: any): Observable<any> {
    return this.http.post(`${API_URL}/auth`, user).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: Error) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${API_URL}/createUser`, user).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error || 'Server error'));
      })
    );
  }
}
