import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketBodyComponent } from './ticket-body/ticket-body.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'createTicket', pathMatch: 'full', component: TicketBodyComponent} 
    ]),
  ],
  declarations: [TicketBodyComponent],
  exports: [TicketBodyComponent],
})
export class PublicTicketModule {}
