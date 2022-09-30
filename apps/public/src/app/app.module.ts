import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublicTicketModule, TicketBodyComponent } from '@grid-watch/public/ticket';
import { RouterModule, Routes } from '@angular/router';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { AdminAppTicketModule } from '@grid-watch/admin-app/ticket';
import { AuthInterceptor, LoggedInGuard, SharedUiModule,ToastService } from '@grid-watch/shared-ui';

import { profile } from 'console';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PublicUserProfileModule } from 'libs/public/user-profile/src';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 '../environments/environment';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageBodyComponent },
  { path: '', component: TicketBodyComponent },
  // { path: 'tickets', component: TicketBodyComponent },
  // { path: 'createTicket', component: CreateTicketComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes), 
    BrowserModule, 
    HttpClientModule, 
    PublicTicketModule,
    AdminAppTicketModule,
    SharedUiModule,
    PublicUserProfileModule,
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
  providers: [ToastService, LoggedInGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
