import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const publicSharedUiRoutes: Route[] = [
  {path: 'login', pathMatch: 'full', component: LoginPageComponent}
];

@NgModule({

  imports: [CommonModule, RouterModule, RouterModule.forChild(publicSharedUiRoutes)],
  declarations: [NavBarComponent, LoginPageComponent],
  exports: [NavBarComponent, LoginPageComponent],
})
export class PublicSharedUiModule {}
