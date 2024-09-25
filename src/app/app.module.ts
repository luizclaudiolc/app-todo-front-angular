import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { CreateModule } from './auth/create/create.module';
import { LoginModule } from './auth/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { AppHeaderModule } from './shared/header/header.module';
import { TokenInterceptor } from './shared/services/interceptors/tokenIntercetors';
import { TaskService } from './shared/services/task.service';
import { CreateTasksModule } from './pages/create-tasks/create-tasks.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { TableTasksComponent } from './pages/table-tasks/table-tasks.component';
import { TableTasksModule } from './pages/table-tasks/table-tasks.module';

const INTERCEPTORRS = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
const appModules = [
  AppHeaderModule,
  HomeModule,
  DashboardModule,
  LoginModule,
  CreateModule,
  CreateTasksModule,
  TableTasksModule,
];
const ngxModeles = [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [...ngxModeles, ...appModules],
  providers: [INTERCEPTORRS, AuthService, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
