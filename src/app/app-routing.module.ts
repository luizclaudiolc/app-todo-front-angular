import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './auth/create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateTasksComponent } from './pages/create-tasks/create-tasks.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoggedUserGuard } from './shared/services/guards/logged-user.guard';
import { LogoutUserGuard } from './shared/services/guards/logout-user.guard';
import { TableTasksComponent } from './pages/table-tasks/table-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LogoutUserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutUserGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [LogoutUserGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'create-task',
    component: CreateTasksComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'table-tasks',
    component: TableTasksComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
