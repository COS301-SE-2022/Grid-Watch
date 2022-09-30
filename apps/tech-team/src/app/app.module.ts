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

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


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
    
    AngularFireModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyB5VKBU78lomWEVrtiUOYIglrM2VdC0jI8",
    authDomain: "epi-use-c9dfa.firebaseapp.com",
    projectId: "epi-use-c9dfa",
    storageBucket: "epi-use-c9dfa.appspot.com",
    messagingSenderId: "342205045804",
    appId: "1:342205045804:web:b401e9bde4216d489a8589",
    measurementId: "G-JW453VRZD1"
  }),
    AngularFirestoreModule,
  ],
  providers: [GoogleMapsService,ToastService, LoggedInGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
