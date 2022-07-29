import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicTicketModule, TicketBodyComponent } from '@grid-watch/public/ticket';
import { RouterModule, Routes } from '@angular/router';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { AdminAppTicketModule } from '@grid-watch/admin-app/ticket';
import { SharedUiModule } from '@grid-watch/shared-ui';

import { profile } from 'console';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PublicUserProfileModule } from 'libs/public/user-profile/src';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: TicketBodyComponent },
  // { path: 'tickets', component: TicketBodyComponent },
  // { path: 'createTicket', component: CreateTicketComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes), 
    BrowserModule, 
    HttpClientModule, 
    PublicTicketModule,
    AdminAppTicketModule,
    SharedUiModule,
    PublicUserProfileModule,
    ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule {}
