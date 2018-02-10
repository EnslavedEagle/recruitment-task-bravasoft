import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
const MODULES = [
  MatInputModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule
];

import { LoaderComponent } from './components';
import { RoutingStateService } from './services';

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
  ],
  providers: [
    RoutingStateService
  ]
})
export class SharedModule { }
