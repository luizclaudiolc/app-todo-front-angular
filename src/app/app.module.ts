import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { CreateModule } from './auth/create/create.module';
import { LoginModule } from './auth/login/login.module';
import { DashbordModule } from './pages/dashbord/dashbord.module';
import { HomeModule } from './pages/home/home.module';
import { TokenInterceptor } from './pages/shared/services/interceptors/tokenIntercetors';
import { TaskService } from './pages/shared/services/task.service';

const matModules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTooltipModule,
];

const appModules = [HomeModule, DashbordModule, LoginModule, CreateModule];
const ngxModeles = [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [...ngxModeles, ...matModules, ...appModules],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    TaskService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
