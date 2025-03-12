import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import type { Observable } from 'rxjs';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SNACK_DEFAULT, sanetizedName } from '../utils/helpers/helpers';
import type { IUser } from '../utils/interfaces/IUsers';

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  login(user: IUser): Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>(`${environment.AUTH_LOGIN}`, user).pipe(
      tap({
        next: (res: AuthResponse) => {
          console.log(res);
          if (!res) return;
          localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
          localStorage.setItem(
            'refreshToken',
            JSON.stringify(res.refreshToken)
          );
          localStorage.setItem('user', JSON.stringify(res.name));

          this.router.navigate(['/dashboard']);
          this.updateLoginStatus(true);
        },
      }),
      catchError((error) => {
        console.log('Erro capturado:', error);
        if (error.status === 401) {
          this.snackBar.open(
            'Falha ao tentar logar, Este e-mail/senha INCORRETOS!',
            'X',
            SNACK_DEFAULT('center')
          );
        } else {
          this.snackBar.open(
            'Erro desconhecido',
            'Algo deu errado. Tente novamente mais tarde.',
            SNACK_DEFAULT()
          );
        }
        // Retorna um Observable vazio para finalizar a stream de erro
        return of(null);
      })
    );
  }

  createUser(user: IUser): Observable<IUser[] | null> {
    return this.http.post<IUser[]>(`${environment.AUTH_CREATE}`, user).pipe(
      tap({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      }),
      catchError((error) => {
        console.log('Erro capturado:', error);
        // Tratar o erro, como email repetido
        if (error.status === 409) {
          this.snackBar.open(
            'Falha ao criar conta, Este e-mail já está em uso!',
            'X',
            SNACK_DEFAULT('center')
          );
        } else {
          this.snackBar.open(
            'Erro desconhecido',
            'Algo deu errado. Tente novamente mais tarde.',
            SNACK_DEFAULT()
          );
        }
        return of(null);
      })
    );
  }

  refreshToken(
    refreshToken: string
  ): Observable<{ accessToken: string; refreshToken: string }> {
    // Remove aspas apenas se existirem no início e no final
    const tokenWithoutQuotes =
      refreshToken.startsWith('"') && refreshToken.endsWith('"')
        ? refreshToken.slice(1, -1)
        : refreshToken;
    return this.http.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${environment.REFRESH_TOKEN}`, {
      refreshToken: tokenWithoutQuotes,
    });
  }

  logout() {
    localStorage.clear();
    this.updateLoginStatus(false);
    this.router.navigate(['']);
  }

  get getUserName(): string {
    const unserName = localStorage.getItem('user');
    const name = unserName ? JSON.parse(unserName) : null;
    const _sanetizedName = sanetizedName(name);
    return _sanetizedName;
  }

  get getUserToken(): string {
    const token = localStorage.getItem('accessToken');
    return token ? JSON.parse(token) : '';
  }

  get isLogged$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    const token = this.getUserToken;
    if (isLoggedIn) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    this.loggedInSubject.next(isLoggedIn);
  }

  get getIsLogged(): boolean {
    return this.loggedInSubject.getValue();
  }
}
