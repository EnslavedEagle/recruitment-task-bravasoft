import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule,
  MatButtonModule
} from '@angular/material';
const MODULES = [
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule,
  MatButtonModule
];

import { LoaderComponent, DeleteDialogComponent } from './components';
import { RoutingStateService, AppHttpInterceptor } from './services';

const EXPORTS = [
  LoaderComponent,
  DeleteDialogComponent
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
