import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components';

const routes: Routes = [
  {
    path: '',
    loadChildren: '@modules/home/home.module#HomeModule',
  },
  {
    path: 'users',
    loadChildren: '@modules/users/users.module#UsersModule'
  },
  {
    path: 'movies',
    loadChildren: '@modules/movies/movies.module#MoviesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
