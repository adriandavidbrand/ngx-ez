import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  EzCheckboxesModule,
  EzCheckboxModule,
  EzFormsModule,
  EzPasswordModule,
  EzRadioModule,
  EzSelectModule,
  EzTableModule,
  EzTextModule,
  EzYesNoModule,
  SameValidatorModule,
} from 'ngx-ez';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EzFormsModule,
    EzTableModule,
    EzCheckboxModule,
    EzCheckboxesModule,
    EzRadioModule,
    EzPasswordModule,
    EzTextModule,
    EzSelectModule,
    SameValidatorModule,
    EzYesNoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
