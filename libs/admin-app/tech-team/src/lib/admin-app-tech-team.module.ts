import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechTeamPageComponent } from './tech-team-page/tech-team-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TechTeamPageComponent],
  exports: [TechTeamPageComponent],
})
export class AdminAppTechTeamModule {}
