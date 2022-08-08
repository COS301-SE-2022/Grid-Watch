import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppTicketModule} from '@grid-watch/admin-app/ticket';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsService, LoggedInGuard, SharedUiModule } from '@grid-watch/shared-ui';
import { AdminAppDashboardModule, DashboardBodyComponent } from '@grid-watch/admin-app/dashboard';
import { AdminAppProfileModule } from '@grid-watch/admin-app/profile';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardBodyComponent, canActivate: [LoggedInGuard] },
  { path: '', component: DashboardBodyComponent, canActivate: [LoggedInGuard] },
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
    AdminAppProfileModule,
    HttpClientModule
  ],
  providers: [GoogleMapsService, LoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
