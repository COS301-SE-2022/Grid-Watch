import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@grid-watch/shared-ui';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { TechTeamTicketModule } from 'libs/tech-team/ticket/src';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageBodyComponent },
  // { path: 'tickets', component: TicketBodyComponent },
  // { path: 'createTicket', component: CreateTicketComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedUiModule,
    TechTeamTicketModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
