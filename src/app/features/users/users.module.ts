import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserDetailComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
  ]
})
export class UsersModule { }
