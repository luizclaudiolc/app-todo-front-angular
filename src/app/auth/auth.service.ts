import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../utils/interfaces/IUsers';
import { SNACK_DEFAULT } from '../utils/helpers/helpers';

export interface AuthResponse {
  token?: string;
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
    return !!localStorage.getItem('token');
  }

  login(user: IUser): Observable<any> {
    return this.http
      .post<AuthResponse>(`${environment.endpoint.auth.login}`, user)
      .pipe(
        tap({
          next: (res: AuthResponse) => {
            if (!res) return;
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem('user', JSON.stringify(res.name));

            this.router.navigate(['/dashboard']);
            this.updateLoginStatus(true);
          },
        }),
        catchError((error) => {
          console.log('Erro capturado:', error);
          // Tratar o erro, como email repetido
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

  createUser(user: IUser): Observable<any> {
    return this.http
      .post<any>(`${environment.endpoint.auth.create}`, user)
      .pipe(
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

  logout() {
    localStorage.clear();
    this.updateLoginStatus(false);
    this.router.navigate(['']);
  }

  get getUserName(): string {
    const unserName = localStorage.getItem('user');
    return unserName ? JSON.parse(unserName) : null;
  }

  get getUserToken(): string {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  get isLogged$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    const token = this.getUserToken;
    if (isLoggedIn) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this.loggedInSubject.next(isLoggedIn);
  }

  get getIsLogged(): boolean {
    return this.loggedInSubject.getValue();
  }
}
