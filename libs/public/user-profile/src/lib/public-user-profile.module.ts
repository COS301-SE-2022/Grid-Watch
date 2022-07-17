import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      { path: 'editUser', pathMatch: 'full', component: EditUserComponent },
      { path: 'login', pathMatch: 'full', component: LoginPageComponent },
      { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
    ]),
  ],
  declarations: [EditUserComponent, LoginPageComponent, RegisterPageComponent],
  exports: [EditUserComponent, LoginPageComponent, RegisterPageComponent],
})
export class PublicUserProfileModule {}
