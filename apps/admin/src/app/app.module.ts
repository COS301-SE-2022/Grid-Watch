import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppTicketModule} from '@grid-watch/admin-app/ticket';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsService, SharedUiModule } from '@grid-watch/shared-ui';
import { AdminAppDashboardModule, DashboardBodyComponent } from '@grid-watch/admin-app/dashboard';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardBodyComponent },
  // { path: 'tickets', component: TicketBodyComponent },
  // { path: 'createTicket', component: CreateTicketComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedUiModule,
    AdminAppTicketModule,
    AdminAppDashboardModule,
    HttpClientModule
  ],
  providers: [GoogleMapsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
