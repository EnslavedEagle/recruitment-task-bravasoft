import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { UsersRoutingModule } from './users-routing.module';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatCardModule } from '@angular/material';
const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule
];

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DeleteDialog } from './components/delete-dialog/delete-dialog';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  declarations: [
    UsersListComponent,
    UserViewComponent,
    UserEditComponent,
    DeleteDialog
  ],
  entryComponents: [
    DeleteDialog
  ],
  providers: [UserService]
})
export class UsersModule { }
