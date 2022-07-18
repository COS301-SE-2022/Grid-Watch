import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterTechTeamComponent } from './register-tech-team/register-tech-team.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'registerTechTeam',
        pathMatch: 'full',
        component: RegisterTechTeamComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: RegisterTechTeamComponent,
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterTechTeamComponent,
      },
    ]),
  ],
  declarations: [
    RegisterTechTeamComponent,
    LoginPageComponent,
  ],
  exports: [
    RegisterTechTeamComponent,
    LoginPageComponent,
  ],
})
export class TechTeamProfileModule {}
