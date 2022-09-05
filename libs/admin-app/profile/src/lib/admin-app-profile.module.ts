import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { addListener } from 'process';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AccountInformationComponent } from './account-information/account-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoggedInGuard } from '@grid-watch/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDialogModule,
    RouterModule.forChild([
      { path: 'login', pathMatch: 'full', component: LoginPageComponent },
      { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
      { path: 'profile', pathMatch: 'full', component: AdminProfileComponent, canActivate: [LoggedInGuard] },
    ]),
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AdminProfileComponent,
    AccountInformationComponent,
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent,
    AdminProfileComponent,
    AccountInformationComponent,
  ],
})
export class AdminAppProfileModule {}
