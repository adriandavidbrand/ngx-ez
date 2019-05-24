import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EzFormsModule } from 'ngx-ez';

import { AppComponent } from './app.component';
import { EzTableModule } from 'ngx-ez';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EzFormsModule,
    EzTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }