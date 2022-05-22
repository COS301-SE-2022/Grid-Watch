import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketViewPageComponent } from './ticket-view-page/ticket-view-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketViewDetailsComponent } from './ticket-view-details/ticket-view-details.component';
import { AcceptedTicketViewComponent } from './accepted-ticket-view/accepted-ticket-view.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
    ]),
  ],
  declarations: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    AcceptedTicketViewComponent,
  ],
  exports: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    AcceptedTicketViewComponent,
  ],
})
export class TechTeamTicketModule {}
