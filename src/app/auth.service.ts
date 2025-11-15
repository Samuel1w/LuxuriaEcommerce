import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/login`, { email, password })
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/register`, { email, password })
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
