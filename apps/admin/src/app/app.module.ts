import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PublicSharedUiModule } from '@grid-watch/public/shared-ui';
import { AdminAppTicketModule, AdminViewBodyComponent } from '@grid-watch/admin-app/ticket';
import { HomePageBodyComponent } from '@grid-watch/public/home-page';
import { HttpClientModule } from '@angular/common/http';

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
    RouterModule.forRoot(routes),
    PublicSharedUiModule,
    AdminAppTicketModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}