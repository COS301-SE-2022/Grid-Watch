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
import { ToastService} from '@grid-watch/shared-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

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
    HttpClientModule,
    NgbModule,
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
  providers: [GoogleMapsService, LoggedInGuard,ToastService ,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
