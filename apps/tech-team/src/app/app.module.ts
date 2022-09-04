import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor, GoogleMapsService, LoggedInGuard, SharedUiModule } from '@grid-watch/shared-ui';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { TechTeamProfileModule } from '@grid-watch/tech-team/profile';
import { TechTeamTicketModule } from '@grid-watch/tech-team/ticket';
import { TechTeamDashboardModule } from '@grid-watch/tech-team/dashboard';
import { TechTeamGeneralUiModule } from '@grid-watch/tech-team/general-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketBodyComponent } from '@grid-watch/public/ticket';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: TicketBodyComponent, canActivate: [LoggedInGuard] },
  // { path: 'tickets', component: TicketBodyComponent },
  // { path: 'createTicket', component: CreateTicketComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedUiModule,
    TechTeamTicketModule,
    TechTeamProfileModule,
    TechTeamDashboardModule,
    TechTeamGeneralUiModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [GoogleMapsService, LoggedInGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
