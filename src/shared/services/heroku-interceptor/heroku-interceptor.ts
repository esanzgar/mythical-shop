import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _user = environment.apiCredentials.user;
  private _password = environment.apiCredentials.password;
  private _herokuUrl = environment.apiUrl;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(this._herokuUrl)) {
      return next.handle(req);
    }

    const encodedAuth = btoa(`${this._user}:${this._password}`);
    const clonedReq = req.clone({
      // headers: req.headers.set('Authorization', `Basic ${encodedAuth}`),
      setHeaders: {
        Authorization: `Basic ${encodedAuth}`
      }
      // withCredentials: true
    });

    return next.handle(clonedReq);
  }
}

/** Http interceptor providers in outside-in order */
export const HerokuInterceptor = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
