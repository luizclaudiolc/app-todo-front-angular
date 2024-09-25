import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

const AppComponent = [DashboardComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...AppComponent],
  imports: [...ngxModules],
  exports: [...AppComponent],
})
export class DashboardModule {}
