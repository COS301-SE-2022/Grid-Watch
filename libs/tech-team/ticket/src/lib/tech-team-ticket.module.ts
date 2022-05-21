import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketViewPageComponent } from './ticket-view-page/ticket-view-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {path: 'tickets', pathMatch: 'full', component: TicketViewPageComponent} 
    ]),
  ],
  declarations: [TicketViewPageComponent],
  exports: [TicketViewPageComponent],
})
export class TechTeamTicketModule {}
