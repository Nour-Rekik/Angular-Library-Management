import {HTTP_INTERCEPTORS, HttpParams, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Injectable } from '@angular/core';

@Injectable() 
export class LoginInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      const cloneReq = req.clone(
       {headers}
      );
      return next.handle(cloneReq);
   } else {
     return next.handle(req);
   }
  }
  /*constructor(private authenticationService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logoutUser();
              location.reload(true);
          }
          
          const error = err.error.message || err.statusText;
          return throwError(error);
      }))*/
  }





export const LoginInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoginInterceptor,
  multi: true
};