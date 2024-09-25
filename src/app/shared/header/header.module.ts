import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const appComponent = [AppHeaderComponent];
const matModules = [
  MatMenuModule,
  MatTooltipModule,
  MatIconModule,
  FlexLayoutModule,
  MatButtonModule,
];
const ngModules = [CommonModule, RouterModule];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngModules, ...matModules],
  exports: [...appComponent],
})
export class AppHeaderModule {}
