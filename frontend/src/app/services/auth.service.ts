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

  public get user(): any {
    const token = localStorage.getItem('token');
    if (token && token !== null ) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
//      console.log(jwtToken);
      return jwtToken;
    }
    return {
      nickname: 'Anónimo',
      image: '/assets/images/defuser.png',
      iat: 0,
      exp: 0
    };
  }
  signIn( user: any ): Observable<object> {
    return this.httpClient.post(this.URL + '/signin', user);
  }

  signUp( user ): Observable<object>  {
    return this.httpClient.post(this.URL + '/signup', user);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token;
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token && token !== null ) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      console.log(timeout);
      if ( timeout > 10000 ) { return true; }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/signin']);
  }

  profile(): void {
    this.router.navigate(['/private/profile']);
  }
}
