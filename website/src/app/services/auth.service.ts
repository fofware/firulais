import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AUTH_URI } from '../shared/uris';
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

  signIn( user ) {
    return this.httpClient.post(this.URL + '/signin', user);
  }

  signUp( user )  {
    return this.httpClient.post(this.URL + '/signup', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
