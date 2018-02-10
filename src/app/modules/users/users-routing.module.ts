import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list';
import { UserViewComponent } from './components/user-view';
import { UserEditComponent } from './components/user-edit';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UsersListComponent
  },
  {
    path: 'view/:userId',
    component: UserViewComponent
  },
  {
    path: 'edit/:userId',
    component: UserEditComponent
  },
  {
    path: 'create',
    component: UserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
