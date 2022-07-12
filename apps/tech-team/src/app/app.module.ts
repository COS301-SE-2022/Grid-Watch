import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsService, SharedUiModule } from '@grid-watch/shared-ui';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { TechTeamProfileModule } from '@grid-watch/tech-team/profile';
import { TechTeamTicketModule } from '@grid-watch/tech-team/ticket';
import { TechTeamDashboardModule } from '@grid-watch/tech-team/dashboard';

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
    TechTeamProfileModule,
    TechTeamDashboardModule,
    RouterModule.forRoot(routes),

  ],
  providers: [GoogleMapsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
