import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/pages/utils/interfaces/IUsers';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginUser.invalid) return;
    const usuario: IUser = this.loginUser.getRawValue();
    this.authService.login(usuario).subscribe((response) => {
      if (response) {
        this.snackBar.open(
          `Seja bem-vindo(a) ao sistema, ${response['name']}!`,
          'x',
          {
            duration: 5000,
          }
        );
      }
    });
  }
}
