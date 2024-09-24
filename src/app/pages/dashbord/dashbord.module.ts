import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord.component';

const AppComponent = [DashbordComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...AppComponent],
  imports: [...ngxModules],
  exports: [...AppComponent],
})
export class DashbordModule {}
