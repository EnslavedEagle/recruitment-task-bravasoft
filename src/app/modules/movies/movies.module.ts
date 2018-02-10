import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared';

import {
  MatIconModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';
const MATERIAL_MODULES = [
  MatIconModule,
  MatCardModule,
  MatButtonModule
];

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent, StarRatingComponent } from './components';
import { MoviesService } from './services';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ...MATERIAL_MODULES
  ],
  declarations: [
    MoviesListComponent,
    StarRatingComponent
  ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
