import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule } from '@angular/forms';

export const publicSharedUiRoutes: Route[] = [
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(publicSharedUiRoutes),
    FormsModule,
  ],
  declarations: [LoginPageComponent, RegisterPageComponent],
  exports: [LoginPageComponent, RegisterPageComponent],
})
export class PublicSharedUiModule {}
