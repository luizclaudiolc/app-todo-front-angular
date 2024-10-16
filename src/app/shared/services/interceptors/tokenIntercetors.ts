import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { AuthService } from "src/app/auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && request.url.startsWith(environment.TASK)) {
      request = this.addToken(request, accessToken);

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && refreshToken) {
            return this.handleRefreshToken(request, next, refreshToken);
          } else {
            this.authService.logout();
            return throwError(
              () => new Error(error.message || "Erro desconhecido"),
            );
          }
        }),
      );
    } else {
      return next.handle(request);
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token,
      },
    });
  }

  private handleRefreshToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string,
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(({ accessToken, refreshToken }) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return next.handle(this.addToken(request, accessToken));
      }),
      catchError((refreshError) => {
        this.authService.logout();
        return throwError(
          () => new Error(refreshError.message || "Erro desconhecido"),
        );
      }),
    );
  }
}
