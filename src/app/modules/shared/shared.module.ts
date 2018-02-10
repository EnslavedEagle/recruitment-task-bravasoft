import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RoutingStateService, AppHttpInterceptor } from './services';

const EXPORTS = [
  LoaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
    RoutingStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
