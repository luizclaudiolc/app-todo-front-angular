import { Component, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACK_DEFAULT, sanetizedName } from 'src/app/utils/helpers/helpers';
import type { IUser } from 'src/app/utils/interfaces/IUsers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createUser: FormGroup;
  isPasswordVisible = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  createUserValues() {
    if (this.createUser.invalid) return;
    const usuario: IUser = this.createUser.getRawValue();

    this.authService
      .createUser(usuario)
      .subscribe((response: IUser[] | null) => {
        if (response && response.length > 0) {
          this.router.navigate(['/login']);
          this.snackBar.open(
            `${sanetizedName(
              // biome-ignore lint:
              response[0].name!
            )}, sua conta foi criada com sucesso! agora, faça o login.`,
            'X',
            SNACK_DEFAULT()
          );
        }
      });
  }
}
