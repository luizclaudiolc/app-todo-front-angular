import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && request.url.startsWith(environment.TASK)) {
      const modifiedRequest = this.addToken(request, accessToken);

      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && refreshToken) {
            return this.handleRefreshToken(request, next, refreshToken);
          }
          this.authService.logout();
          return throwError(
            () => new Error(error.message || 'Erro desconhecido')
          );
        })
      );
    }
    return next.handle(request);
  }

  private addToken(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token,
      },
    });
  }

  private handleRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    refreshToken: string
  ): Observable<HttpEvent<unknown>> {
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(({ accessToken, refreshToken }) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return next.handle(this.addToken(request, accessToken));
      }),
      catchError((refreshError) => {
        this.authService.logout();
        return throwError(
          () => new Error(refreshError.message || 'Erro desconhecido')
        );
      })
    );
  }
}
