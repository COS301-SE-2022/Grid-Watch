import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const publicSharedUiRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent],
})
export class PublicSharedUiModule {}
