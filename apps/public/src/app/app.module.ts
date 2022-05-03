import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicTicketModule, TicketBodyComponent } from '@grid-watch/public/ticket';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'createTicket', component: TicketBodyComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule, PublicTicketModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
