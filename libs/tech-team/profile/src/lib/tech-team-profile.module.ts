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
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoggedInGuard } from '@grid-watch/shared-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileSettingComponent } from '@grid-watch/public/user-profile';

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
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    NgbModule,
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
        canActivate: [LoggedInGuard],
      },
      {
        path: 'profileSettings',
        pathMatch: 'full',
        component: ProfileSettingComponent,
        canActivate: [LoggedInGuard],
      },
    ]),
  ],
  declarations: [
    RegisterTechTeamComponent,
    LoginPageComponent,
    TechTeamProfileComponent,
    ProfileSettingsComponent,
  ],
  exports: [
    RegisterTechTeamComponent,
    LoginPageComponent,
    TechTeamProfileComponent,
    ProfileSettingsComponent,
  ],
})
export class TechTeamProfileModule {}
