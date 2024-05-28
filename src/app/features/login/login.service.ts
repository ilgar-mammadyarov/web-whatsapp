import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  getUserCountry(): Observable<string> {
    return this.http
      .get<{ country: string }>('https://ipinfo.io/json')
      .pipe(map((response) => response.country));
  }
}
