import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageBodyComponent } from './home-page-body/home-page-body.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'home', pathMatch: 'full', component: HomePageBodyComponent} 
    ]),
  ],
  declarations: [HomePageBodyComponent],
  exports: [HomePageBodyComponent],
})
export class PublicHomePageModule {}
