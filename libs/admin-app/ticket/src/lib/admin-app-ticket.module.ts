import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminViewBodyComponent } from './admin-view-body/admin-view-body.component';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'adminViewTicket',
        pathMatch: 'full',
        component: AdminViewBodyComponent,
      },
      {
        path: 'adminViewTicketDetails',
        pathMatch: 'prefix',
        component: ViewTicketDetailsComponent,
      },
    ]),
  ],
  declarations: [
    AdminViewBodyComponent,
    ViewTicketDetailsComponent,
    DashboardComponent,
  ],
  exports: [
    AdminViewBodyComponent,
    ViewTicketDetailsComponent,
    DashboardComponent,
  ],
})
export class AdminAppTicketModule {}
