import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketViewPageComponent } from './ticket-view-page/ticket-view-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketViewDetailsComponent } from './ticket-view-details/ticket-view-details.component';
import { AcceptedTicketViewComponent } from './accepted-ticket-view/accepted-ticket-view.component';
import { EditAcceptedTicketComponent } from './edit-accepted-ticket/edit-accepted-ticket.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {
        path: 'tickets',
        pathMatch: 'full',
        component: TicketViewPageComponent,
      },
      {
        path: 'ticketDetails',
        pathMatch: 'full',
        component: TicketViewDetailsComponent,
      },
      {
        path: 'acceptedTickets',
        pathMatch: 'full',
        component: AcceptedTicketViewComponent,
      },
      {
        path: 'editTicketDetails',
        pathMatch: 'full',
        component: EditAcceptedTicketComponent,
      },
    ]),
  ],
  declarations: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    AcceptedTicketViewComponent,
    EditAcceptedTicketComponent,
  ],
  exports: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    AcceptedTicketViewComponent,
    EditAcceptedTicketComponent,
  ],
})
export class TechTeamTicketModule {}
