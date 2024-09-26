import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.TASK.split('/');
    console.log({ token, requestUrl: request.url });

    if (token && token && request.url.startsWith(environment.TASK)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          token: `${token}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401)
            this.authService.logout();

          return throwError(
            () => new Error(error.message || 'Erro desconhecido')
          );
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
