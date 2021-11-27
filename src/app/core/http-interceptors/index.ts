import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccesTokenInterceptor } from './acces-token.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AccesTokenInterceptor, multi: true },
];
