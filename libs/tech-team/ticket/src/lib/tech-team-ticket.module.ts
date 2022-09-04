import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketViewPageComponent } from './ticket-view-page/ticket-view-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketViewDetailsComponent } from './ticket-view-details/ticket-view-details.component';
import { EditAcceptedTicketComponent } from './edit-accepted-ticket/edit-accepted-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatGridListModule } from '@angular/material/grid-list';
import { LoggedInGuard } from '@grid-watch/shared-ui';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { TicketViewBodyComponent } from './ticket-view-body/ticket-view-body.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TicketViewMapComponent } from './ticket-view-map/ticket-view-map.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
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
    MatGridListModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {
        path: 'tickets',
        pathMatch: 'full',
        component: TicketViewBodyComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'ticketDetails',
        pathMatch: 'full',
        component: TicketViewDetailsComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'editTicketDetails',
        pathMatch: 'full',
        component: EditAcceptedTicketComponent,
        canActivate: [LoggedInGuard],
      },
    ]),
  ],
  declarations: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    EditAcceptedTicketComponent,
    DialogComponent,
    TicketViewBodyComponent,
    TicketViewMapComponent,
  ],
  exports: [
    TicketViewPageComponent,
    TicketViewDetailsComponent,
    EditAcceptedTicketComponent,
    DialogComponent,
    TicketViewBodyComponent,
    TicketViewMapComponent,
  ],
})
export class TechTeamTicketModule {}
