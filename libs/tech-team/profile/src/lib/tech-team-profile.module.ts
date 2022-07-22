import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterTechTeamComponent } from './register-tech-team/register-tech-team.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TechTeamProfileComponent } from './tech-team-profile/tech-team-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterTechTeamComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginPageComponent,
      },
      {
        path: 'profile',
        pathMatch: 'full',
        component: TechTeamProfileComponent,
      },
    ]),
  ],
  declarations: [
    RegisterTechTeamComponent,
    LoginPageComponent,
    TechTeamProfileComponent,
  ],
  exports: [
    RegisterTechTeamComponent,
    LoginPageComponent,
    TechTeamProfileComponent,
  ],
})
export class TechTeamProfileModule {}
