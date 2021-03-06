import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { MenuOptionsComponent } from './menu-options/menu-options.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      // { path: 'login', pathMatch: 'full', component: LoginPageComponent },
      // { path: 'register', pathMatch: 'full', component: RegisterPageComponent },
    ]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  declarations: [
    NavBarComponent,
    MenuOptionsComponent,
    AppHeaderComponent,
  ],
  exports: [
    NavBarComponent,
    MenuOptionsComponent,
    AppHeaderComponent,
  ],
})
export class SharedUiModule {}
