import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TableTasksComponent } from './table-tasks.component';

const appComponent = [TableTasksComponent];
const ngxModeles = [CommonModule];
const matModules = [
  MatFormFieldModule,
  MatIconModule,
  FormsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatListModule,
  MatDividerModule,
  MatButtonModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxModeles, ...matModules],
  exports: [...appComponent],
})
export class TableTasksModule {}
