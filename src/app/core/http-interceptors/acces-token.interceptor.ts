import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AccesTokenModel } from 'src/app/pages/auth/auth.models';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable()
export class AccesTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accesToken = this.authService.getAccesToken;

    if (accesToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accesToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
