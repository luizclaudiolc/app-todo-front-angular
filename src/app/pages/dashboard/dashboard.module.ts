import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PieChartModule } from 'src/app/shared/pie-chart/pie-chart.module';

const AppComponent = [DashboardComponent];
const ngxModules = [CommonModule];
const matModules = [MatCardModule, MatIconModule, MatProgressSpinnerModule];
const appModules = [PieChartModule];

@NgModule({
  declarations: [...AppComponent],
  imports: [...ngxModules, ...matModules, ...appModules],
  exports: [...AppComponent],
})
export class DashboardModule {}
