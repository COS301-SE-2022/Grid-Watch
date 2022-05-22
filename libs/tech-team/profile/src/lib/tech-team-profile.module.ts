import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterTechTeamComponent } from './register-tech-team/register-tech-team.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: 'registerTechTeam', pathMatch: 'full', component: RegisterTechTeamComponent} 
    ]),
  ],
  declarations: [RegisterTechTeamComponent],
  exports: [RegisterTechTeamComponent],
})
export class TechTeamProfileModule {}
