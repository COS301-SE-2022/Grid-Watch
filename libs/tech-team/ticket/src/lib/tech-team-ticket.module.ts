import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketViewPageComponent } from './ticket-view-page/ticket-view-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketViewDetailsComponent } from './ticket-view-details/ticket-view-details.component';
import { AcceptedTicketViewComponent } from './accepted-ticket-view/accepted-ticket-view.component';
import { EditAcceptedTicketComponent } from './edit-accepted-ticket/edit-accepted-ticket.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
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
    DialogComponent,
  ],
  exports: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    AcceptedTicketViewComponent,
    EditAcceptedTicketComponent,
    DialogComponent,
  ]
})
export class TechTeamTicketModule {}
