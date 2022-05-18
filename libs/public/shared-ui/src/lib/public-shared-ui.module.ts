import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const publicSharedUiRoutes: Route[] = [
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(publicSharedUiRoutes),
  ],
  declarations: [NavBarComponent, LoginPageComponent, RegisterPageComponent],
  exports: [NavBarComponent, LoginPageComponent, RegisterPageComponent],
})
export class PublicSharedUiModule {}
