import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreateModule } from 'src/app/auth/create/create.module';
import { LoginModule } from 'src/app/auth/login/login.module';
import { ToolbarComponent } from './toolbar.component';
import { MatButtonModule } from '@angular/material/button';

const appComponent = [ToolbarComponent];
const ngxComponent = [CommonModule, AppRoutingModule];
const componentModules = [LoginModule, CreateModule];
const matModules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxComponent, ...componentModules, ...matModules],
  exports: [...appComponent],
})
export class ToolbarModule {}
