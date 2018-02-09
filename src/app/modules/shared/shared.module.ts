import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatProgressSpinnerModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';
const MODULES = [
  MatInputModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatSnackBarModule
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
  exports: [
    ...MODULES,
    ...EXPORTS
  ],
  declarations: [
    ...EXPORTS
  ]
})
export class SharedModule { }
