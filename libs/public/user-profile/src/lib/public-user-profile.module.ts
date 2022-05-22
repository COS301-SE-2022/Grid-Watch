import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {path: 'editUser/:id', pathMatch: 'prefix', component: EditUserComponent},
    ]),
  ],
  declarations: [EditUserComponent],
  exports: [EditUserComponent],
})
export class PublicUserProfileModule {}
