import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule
];
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
const BOOTSTRAP_MODULES = [
  CollapseModule.forRoot(),
  BsDropdownModule.forRoot()
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
    HttpModule,
    AppRoutingModule,
    ...MATERIAL_MODULES,
    ...BOOTSTRAP_MODULES
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
