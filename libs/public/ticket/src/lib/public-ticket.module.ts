import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketBodyComponent } from './ticket-body/ticket-body.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TicketSettingsOptionsComponent } from './ticket-settings-options/ticket-settings-options.component';
// import { ApiTicketService } from 'libs/api/ticket/service/src/lib/api-ticket.service';
// import { MatDialog } from '@angular/material/dialog';
// import {BrowserAnimationModule} from '@angular/material/';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: 'createTicket',
        pathMatch: 'full',
        component: CreateTicketComponent,
      },
      {
        path: 'tickets',
        pathMatch: 'full',
        component: TicketBodyComponent,
      },
    ]),
  ],
  declarations: [
    TicketBodyComponent,
    CreateTicketComponent,
    TicketSettingsOptionsComponent,
  ],
  exports: [
    TicketBodyComponent,
    CreateTicketComponent,
    TicketSettingsOptionsComponent,
  ],
})
export class PublicTicketModule {}
