import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  EzCheckboxesComponent,
  EzCheckboxComponent,
  EzFormsModule,
  EzModalModule,
  EzPasswordComponent,
  EzRadioComponent,
  EzSelectComponent,
  EzTableModule,
  EzTabsModule,
  EzTextComponent,
  EzYesNoComponent,
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
    EzCheckboxComponent,
    EzCheckboxesComponent,
    EzRadioComponent,
    EzPasswordComponent,
    EzTextComponent,
    EzSelectComponent,
    SameValidatorModule,
    EzYesNoComponent,
    EzTabsModule,
    EzModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
