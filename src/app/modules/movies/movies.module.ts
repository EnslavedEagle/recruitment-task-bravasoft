import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared';

import {
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule
} from '@angular/material';
const MATERIAL_MODULES = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule
];

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent, StarRatingComponent, MovieDetailsComponent } from './components';
import { MoviesService } from './services';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ...MATERIAL_MODULES
  ],
  declarations: [
    MoviesListComponent,
    StarRatingComponent,
    MovieDetailsComponent
  ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
