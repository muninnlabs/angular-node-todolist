import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthPermissionService {
  private cookieService = inject(CookieService);
  constructor() {}

  isGranted(): Observable<boolean> {
    if (this.cookieService.check('token')) {
      return of(true).pipe(tap((v) => console.log(v)));
    } else {
      return of(false).pipe(tap((v) => console.log(v)));
    }
    // return of(true).pipe(tap((v) => console.log(v)));
  }
}
