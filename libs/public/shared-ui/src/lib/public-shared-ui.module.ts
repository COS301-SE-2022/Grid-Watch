import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

export const publicSharedUiRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class PublicSharedUiModule {}
