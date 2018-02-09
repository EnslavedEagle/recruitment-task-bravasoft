import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
];
import { AppRoutingModule } from './app-routing.module';
import { MainComponent, NavigationComponent } from './components';

@NgModule({
  declarations: [
    MainComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ...MATERIAL_MODULES
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
