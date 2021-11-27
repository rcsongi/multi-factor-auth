import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Environment } from '../environment/environment.model';
import { ENVIRONMENT } from '../environment/environment.token';
import { RequestOptions } from './api.models';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private client: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  public get<T>(url: string, options?: RequestOptions): Observable<T> {
    const headers = { ...options.headers, Accept: 'aplication/json' };
    return this.request('GET', url, { ...options, headers });
  }

  public post<T>(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Observable<T> {
    const headers = { ...options?.headers, Accept: 'aplication/json' };
    return this.request('POST', url, { body, ...options, headers });
  }

  public put<T>(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Observable<T> {
    const headers = { ...options?.headers, Accept: 'aplication/json' };
    return this.request('PUT', url, { body, ...options, headers });
  }

  public patch<T>(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Observable<T> {
    const headers = { ...options?.headers, Accept: 'aplication/json' };
    return this.request('PATCH', url, { body, ...options, headers });
  }

  public delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.request('DELETE', url, options);
  }

  private request<T>(
    method: string,
    url: string,
    options?: RequestOptions
  ): Observable<T> {
    return this.client.request(method, this.createUrl(url), options).pipe(
      tap(() => {
        if (method !== 'GET' && !options.skipNotification) {
          //TODO Snackbar
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.openSnackbar(
          error.error ? error.error.message : 'Váratlan hiba történt'
        );
        switch (error.status) {
          case 401:
            this.router.navigateByUrl('/auth/login');
            break;
          default:
            break;
        }
        return throwError(error);
      })
    );
  }

  private createUrl(url: string): string {
    return url.startsWith('http')
      ? url
      : new URL(url, this.environment.apiUrl).href;
  }
}
