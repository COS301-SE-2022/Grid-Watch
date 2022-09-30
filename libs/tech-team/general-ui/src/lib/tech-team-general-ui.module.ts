import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FormBuilder } from '@angular/forms';
import { TechTeamNavbarComponent } from './tech-team-navbar/tech-team-navbar.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      // {path: '', pathMatch: 'full', component: InsertYourComponentHere}
    ]),
  ],
  declarations: [MenuBarComponent, TechTeamNavbarComponent],
  exports: [MenuBarComponent, TechTeamNavbarComponent],
  providers: [FormBuilder],
})
export class TechTeamGeneralUiModule {}
