import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared';

import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule
  ],
  declarations: []
})
export class MoviesModule { }
