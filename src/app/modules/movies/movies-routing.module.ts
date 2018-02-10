import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MoviesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
