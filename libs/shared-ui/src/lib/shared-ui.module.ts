import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MenuOptionsComponent } from './menu-options/menu-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', pathMatch: 'full', component: LoginPageComponent },
      { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
    ]),
  ],
  declarations: [
    NavBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MenuOptionsComponent,
  ],
  exports: [
    NavBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MenuOptionsComponent,
  ],
})
export class SharedUiModule {}
