import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechTeamPageComponent } from './tech-team-page/tech-team-page.component';
import { RouterModule } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent, AdminProfileComponent } from '@grid-watch/admin-app/profile';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule,
    MatGridListModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: 'tech-team', pathMatch: 'full', component: TechTeamPageComponent },
    ])],
  declarations: [TechTeamPageComponent],
  exports: [TechTeamPageComponent],
})
export class AdminAppTechTeamModule {}
