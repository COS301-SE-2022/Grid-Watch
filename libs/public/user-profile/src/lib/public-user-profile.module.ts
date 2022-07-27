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
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MyTicketsListComponent } from './my-tickets-list/my-tickets-list.component';
import { MyTicketsBlockComponent } from './my-tickets-block/my-tickets-block.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';

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
    MatDividerModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatGridListModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      { path: 'editUser', pathMatch: 'full', component: EditUserComponent },
      { path: 'login', pathMatch: 'full', component: LoginPageComponent },
      { path: 'profile', pathMatch: 'full', component: MyProfileComponent },
      { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
      { path: 'profileSettings', pathMatch: 'full', component: ProfileSettingComponent },
    ]),
  ],
  declarations: [
    EditUserComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MyProfileComponent,
    MyTicketsListComponent,
    MyTicketsBlockComponent,
    ProfileSettingComponent,
  ],
  exports: [
    EditUserComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MyProfileComponent,
    MyTicketsListComponent,
    MyTicketsBlockComponent,
    ProfileSettingComponent,
  ],
})
export class PublicUserProfileModule {}
