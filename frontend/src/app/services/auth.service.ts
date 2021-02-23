import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_URI } from '../shared/uris';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = AUTH_URI;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  signIn( user: any ): Observable<object> {
    return this.httpClient.post(this.URL + '/signin', user);
  }

  signUp( user ): Observable<object>  {
    return this.httpClient.post(this.URL + '/signup', user);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    const stg = localStorage.getItem('token');
    console.log('STORAGE', stg);
    if (stg) { return true; }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

}
