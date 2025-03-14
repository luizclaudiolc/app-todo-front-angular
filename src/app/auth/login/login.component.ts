import { Component, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACK_DEFAULT, sanetizedName } from 'src/app/utils/helpers/helpers';
import type { IUser } from 'src/app/utils/interfaces/IUsers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;
  isPasswordVisible = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
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
          `Seja bem-vindo(a) ao sistema, ${sanetizedName(response.name)}!`,
          'x',
          SNACK_DEFAULT()
        );
      }
    });
  }
}
