import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketBodyComponent } from './ticket-body/ticket-body.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
// import {BrowserAnimationModule} from '@angular/material/';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'createTicket',
        pathMatch: 'full',
        component: TicketBodyComponent,
      },
    ]),
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    BrowserAnimationsModule,
  ],
  declarations: [TicketBodyComponent, CreateTicketComponent],
  exports: [TicketBodyComponent, CreateTicketComponent],
})
export class PublicTicketModule {}
