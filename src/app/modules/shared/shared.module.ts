import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material';
const MODULES = [
  MatProgressSpinnerModule
]

import { LoaderComponent } from './components';

const EXPORTS = [
  LoaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: EXPORTS,
  declarations: [
    ...EXPORTS
  ]
})
export class SharedModule { }
