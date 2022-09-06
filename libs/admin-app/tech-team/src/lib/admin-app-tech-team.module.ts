import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechTeamPageComponent } from './tech-team-page/tech-team-page.component';
import { RouterModule } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent, AdminProfileComponent } from '@grid-watch/admin-app/profile';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [CommonModule,
    MatGridListModule,
    RouterModule.forChild([
      { path: 'tech-team', pathMatch: 'full', component: TechTeamPageComponent },
    ])],
  declarations: [TechTeamPageComponent],
  exports: [TechTeamPageComponent],
})
export class AdminAppTechTeamModule {}
