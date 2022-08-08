import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketBodyComponent } from './ticket-body/ticket-body.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsService, LoggedInGuard } from '@grid-watch/shared-ui';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TicketBodyListComponent } from './ticket-body-list/ticket-body-list.component';
import { TicketBodyMapComponent } from './ticket-body-map/ticket-body-map.component';
// import { ApiTicketService } from 'libs/api/ticket/service/src/lib/api-ticket.service';
// import { MatDialog } from '@angular/material/dialog';
// import {BrowserAnimationModule} from '@angular/material/';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    GoogleMapsModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonToggleModule,
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
      {
        path: 'editTicket',
        pathMatch: 'prefix',
        component: EditTicketComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'viewTicket',
        pathMatch: 'prefix',
        component: ViewTicketComponent,
      },
    ]),
  ],
  declarations: [
    TicketBodyComponent,
    CreateTicketComponent,
    EditTicketComponent,
    ViewTicketComponent,
    TicketBodyListComponent,
    TicketBodyMapComponent,
  ],
  exports: [
    TicketBodyComponent,
    CreateTicketComponent,
    EditTicketComponent,
    ViewTicketComponent,
    TicketBodyListComponent,
    TicketBodyMapComponent,
  ],
  providers: [FormBuilder, GoogleMapsService, LoggedInGuard],
})
export class PublicTicketModule {}
