import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { API_URI } from '../shared/uris';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authService.user;
    console.log(user);
    const isLoggedIn = user && user._id;
    const isApiUrl = request.url.startsWith(API_URI);
    console.log(isApiUrl);
    console.log(request.url.valueOf());
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
          setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
      });
    }
    return next.handle(request);
  }
}
