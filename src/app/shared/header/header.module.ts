import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header.component';

const appComponent = [AppHeaderComponent];
const matModules = [
  MatMenuModule,
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
];
const ngModules = [CommonModule, RouterModule];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngModules, ...matModules],
  exports: [...appComponent],
})
export class AppHeaderModule {}
// <span class="app-icon-center">
// <a
//   [routerLink]="isLogged ? '/table-tasks' : '/'"
//   [matTooltip]="isLogged ? 'Tarefas' : 'Home'"
// >
//   <img
//     src="https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2"
//     alt="logo"
//   />
// </a>
// </span>
