import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { DashboardTimelineComponent } from './dashboard-timeline/dashboard-timeline.component';
import { MatDividerModule } from '@angular/material/divider';
import { AdminAppTicketModule, AdminViewBodyComponent } from '@grid-watch/admin-app/ticket';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule } from '@angular/forms';
import { AdminAppTechTeamModule } from '@grid-watch/admin-app/tech-team';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forChild([
      { path: 'dashboard', pathMatch: 'full', component: DashboardOverviewComponent },
    ]),
    MatGridListModule,
    AdminAppTicketModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatRadioModule,
    LayoutModule,
    FormsModule,
    AdminAppTechTeamModule
  ],
  declarations: [
    DashboardBodyComponent,
    DashboardOverviewComponent,
    DashboardTimelineComponent,
  ],
  exports: [
    DashboardBodyComponent,
    DashboardOverviewComponent,
    DashboardTimelineComponent,
  ],
})
export class AdminAppDashboardModule {
  constructor()
  {
    Chart.register(...registerables);
  }
}
