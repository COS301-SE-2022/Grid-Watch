import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageBodyComponent } from './home-page-body/home-page-body.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'home', pathMatch: 'full', component: HomePageBodyComponent} 
    ]),
    BrowserModule,
    GoogleMapsModule
  ],
  declarations: [HomePageBodyComponent],
  exports: [HomePageBodyComponent],
})
export class PublicHomePageModule {}
