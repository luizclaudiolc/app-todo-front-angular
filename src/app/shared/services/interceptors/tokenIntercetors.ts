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

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler,
//   ): Observable<HttpEvent<any>> {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken && request.url.startsWith(environment.TASK)) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${accessToken}`,
//           token: accessToken,
//         },
//       });

//       return next.handle(request).pipe(
//         catchError((error: HttpErrorResponse) => {
//           if (error.status === 401 && refreshToken) {
//             return this.authService.refreshToken(refreshToken).pipe(
//               switchMap(({ accessToken, refreshToken }) => {
//                 localStorage.setItem("accessToken", accessToken);
//                 localStorage.setItem("refreshToken", refreshToken);
//                 request = request.clone({
//                   setHeaders: {
//                     Authorization: `Bearer ${accessToken}`,
//                     token: accessToken,
//                   },
//                 })
//                 return next.handle(request);
//               }),
//               catchError((refreshError) => {
//                 this.authService.logout();
//                 return throwError(
//                   () => new Error(refreshError.message || "Erro desconhecido"),
//                 );
//               }),
//             );
//           } else {
//             this.authService.logout();
//             return throwError(
//               () => new Error(error.message || "Erro desconhecido"),
//             );
//           }
//         }),
//       );
//     } else {
//       return next.handle(request);
//     }
//   }
// }
//
//
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
      request = this.addTokenToRequest(request, accessToken);

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          // Verifica se o erro é de token expirado (401) e se há um refreshToken disponível
          if (error.status === 401 && refreshToken) {
            return this.handle401Error(request, next, refreshToken);
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

  // Método para adicionar o token ao cabeçalho da requisição
  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string,
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token,
      },
    });
  }

  // Método para lidar com o erro 401 e tentar o refresh do token
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string,
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(({ accessToken, refreshToken }) => {
        // Salva os novos tokens no localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Clona a requisição original com o novo token
        request = this.addTokenToRequest(request, accessToken);
        return next.handle(request);
      }),
      catchError((refreshError) => {
        // Se o refresh falhar, faz o logout
        this.authService.logout();
        return throwError(
          () => new Error(refreshError.message || "Erro ao renovar token"),
        );
      }),
    );
  }
}
