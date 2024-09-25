import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from 'src/app/auth/create/create.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateTasksComponent } from './create-tasks.component';

const appComponents = [CreateTasksComponent];
const ngxModules = [CommonModule];
const matModules = [
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxModules, ...matModules],
  exports: [...appComponents],
})
export class CreateTasksModule {}
