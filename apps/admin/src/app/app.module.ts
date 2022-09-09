import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppTicketModule} from '@grid-watch/admin-app/ticket';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, GoogleMapsService, LoggedInGuard, SharedUiModule } from '@grid-watch/shared-ui';
import { AdminAppDashboardModule, DashboardBodyComponent, DashboardOverviewComponent } from '@grid-watch/admin-app/dashboard';
import { AdminAppProfileModule } from '@grid-watch/admin-app/profile';
import { AdminAppTechTeamModule } from '@grid-watch/admin-app/tech-team';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardOverviewComponent, canActivate: [LoggedInGuard] },
  { path: '', component: DashboardOverviewComponent, canActivate: [LoggedInGuard] },
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
    AdminAppTechTeamModule,
    HttpClientModule
  ],
  providers: [GoogleMapsService, LoggedInGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
