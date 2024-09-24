import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogged = false;
  public userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.userName = this.authService.getUserName;

      if (isLogged) this.router.navigate(['/dashboard']);
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
