import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent, MovieDetailsComponent, MovieEditComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MoviesListComponent
  },
  {
    path: 'details/:movieId',
    component: MovieDetailsComponent
  },
  {
    path: 'edit/:movieId',
    component: MovieEditComponent
  },
  {
    path: 'create',
    component: MovieEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
