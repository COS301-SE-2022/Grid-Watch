import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      // {path: '', pathMatch: 'full', component: InsertYourComponentHere}
    ]),
  ],
  declarations: [MenuBarComponent],
  exports: [MenuBarComponent],
  providers: [FormBuilder]
})
export class TechTeamGeneralUiModule {}
