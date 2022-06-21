import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminViewBodyComponent } from './admin-view-body/admin-view-body.component';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';
import { FormBuilder, FormGroupDirective, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table'  
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'adminViewTicket',
        pathMatch: 'full',
        component: AdminViewBodyComponent,
      },
      {
        path: 'adminViewTicketDetails',
        pathMatch: 'prefix',
        component: ViewTicketDetailsComponent,
      },
    ]),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule
  ],
  declarations: [
    AdminViewBodyComponent,
    ViewTicketDetailsComponent,
  ],
  exports: [
    AdminViewBodyComponent,
    ViewTicketDetailsComponent,
  ],
  providers: [FormBuilder]
})
export class AdminAppTicketModule {}
