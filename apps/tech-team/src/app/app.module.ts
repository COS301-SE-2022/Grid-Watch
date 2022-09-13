import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor, GoogleMapsService, LoggedInGuard, SharedUiModule, ToastService } from '@grid-watch/shared-ui';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { TechTeamProfileModule } from '@grid-watch/tech-team/profile';
import { TechTeamTicketModule, TicketViewPageComponent, TicketViewBodyComponent } from '@grid-watch/tech-team/ticket';
import { TechTeamDashboardModule } from '@grid-watch/tech-team/dashboard';
import { TechTeamGeneralUiModule } from '@grid-watch/tech-team/general-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketBodyComponent } from '@grid-watch/public/ticket';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: TicketViewBodyComponent, canActivate: [LoggedInGuard] },
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
    NgbModule,
    RouterModule.forRoot(routes),
  ],
  providers: [GoogleMapsService,ToastService, LoggedInGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
