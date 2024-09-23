import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateModule } from 'src/app/auth/create/create.module';
import { LoginModule } from 'src/app/auth/login/login.module';
import { HomeComponent } from './home.component';

const appComponent = [HomeComponent];
const ngxComponent = [CommonModule];
const matModules = [MatToolbarModule, MatIconModule];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxComponent, ...matModules],
  exports: [...appComponent],
})
export class HomeModule {}
