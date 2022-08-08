import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { LoggedInGuard } from '@grid-watch/shared-ui';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {path: 'dashboard', pathMatch: 'full', component: DashboardBodyComponent, canActivate: [LoggedInGuard]}, 
    ]),

    MatGridListModule,

    MatCardModule,

    MatMenuModule,

    MatIconModule,

    MatButtonModule,

    LayoutModule,

  ],
  declarations: [DashboardBodyComponent],
  exports: [DashboardBodyComponent],
})
export class TechTeamDashboardModule {}
