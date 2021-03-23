import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( error => {
/*
        console.log('INTERCEPTORerror');
        console.log('Status', error.status);
        console.log('Error', error.error);
        console.log('Message', error.message);
        console.log('Name', error.name);
        console.log('statusText', error.statusText);
        console.log('url', error.url);
*/
        if ( error.status === 401 ){
          this.auth.logout();
        }
        return throwError(error);
      })
    );
  }
}
