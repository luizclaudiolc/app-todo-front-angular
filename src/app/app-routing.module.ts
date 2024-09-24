import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './auth/create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { HomeComponent } from './pages/home/home.component';
import { LoggedUserGuard } from './pages/shared/services/guards/logged-user.guard';
import { LogoutUserGuard } from './pages/shared/services/guards/logout-user.guard';

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
    component: DashbordComponent,
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
