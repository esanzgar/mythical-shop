import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../material/material.module';

import { RootComponent } from './containers/root/root.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [RootComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {}
