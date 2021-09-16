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
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private auth: AuthService, private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( error => {
        if ( error.status === 401 ){
          this.auth.logout();
        }
        if ( error.status === 500 ){
          this.alertService.error(error);
          console.log(error)
        }
        return throwError(error);
      })
    );
  }
}
