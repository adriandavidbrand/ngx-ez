import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  EzCheckboxesModule,
  EzCheckboxModule,
  EzFormsModule,
  EzModalModule,
  EzPasswordModule,
  EzRadioModule,
  EzSelectModule,
  EzTableModule,
  EzTabsModule,
  EzTextModule,
  EzYesNoModule,
  SameValidatorModule,
} from 'ngx-ez';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './components/forms/forms.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, FormsComponent, TableComponent, ModalComponent],
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
    EzTabsModule,
    EzModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
