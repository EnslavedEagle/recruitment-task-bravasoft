import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { UsersRoutingModule } from './users-routing.module';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule } from '@angular/material';
const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule
];

import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ...MATERIAL_MODULES
  ],
  declarations: [
    UsersListComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
