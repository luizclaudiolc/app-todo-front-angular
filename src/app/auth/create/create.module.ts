import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateComponent } from './create.component';
import { MatIconModule } from '@angular/material/icon';

const appComponent = [CreateComponent];
const ngxComponent = [CommonModule];
const matModules = [
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxComponent, ...matModules],
  exports: [...appComponent],
})
export class CreateModule {}
