import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicTicketModule, TicketBodyComponent } from '@grid-watch/public/ticket';
import { RouterModule, Routes } from '@angular/router';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { PublicSharedUiModule } from '@grid-watch/public/shared-ui';
import { AdminAppTicketModule } from '@grid-watch/admin-app/ticket';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageBodyComponent },
  // { path: 'tickets', component: TicketBodyComponent },
  // { path: 'createTicket', component: CreateTicketComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes), 
    BrowserModule, 
    HttpClientModule, 
    PublicTicketModule, 
    PublicSharedUiModule, 
    AdminAppTicketModule],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule {}
