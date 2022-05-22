import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketViewPageComponent } from './ticket-view-page/ticket-view-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketViewDetailsComponent } from './ticket-view-details/ticket-view-details.component';

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
    ]),
  ],
  declarations: [TicketViewPageComponent, TicketViewDetailsComponent],
  exports: [TicketViewPageComponent, TicketViewDetailsComponent],
})
export class TechTeamTicketModule {}
