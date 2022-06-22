import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageBodyComponent } from './home-page-body/home-page-body.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsService } from '@grid-watch/shared-ui';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    GoogleMapsModule,
    RouterModule.forChild([
       {path: 'home', pathMatch: 'full', component: HomePageBodyComponent} 
    ]),
    
  ],
  declarations: [HomePageBodyComponent],
  exports: [HomePageBodyComponent],
  providers : [GoogleMapsService]
})
export class PublicHomePageModule {}
