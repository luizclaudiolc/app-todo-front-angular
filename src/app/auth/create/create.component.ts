import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/utils/interfaces/IUsers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
    console.log(usuario);

    this.authService.createUser(usuario).subscribe((response) => {
      console.log(response);
      if (response) {
        this.router.navigate(['/login']);
        this.snackBar.open(
          `${response['name']}, sua conta foi criada com sucesso! agora, faça o login.`,
          'X',
          {
            duration: 5000,
          }
        );
      }
    });
  }
}
