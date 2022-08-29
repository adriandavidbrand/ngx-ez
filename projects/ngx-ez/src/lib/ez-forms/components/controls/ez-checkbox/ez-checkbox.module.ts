import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzCheckboxComponent } from './ez-checkbox.component';
import { EzFormsModule } from '../../../ez-forms.module';

@NgModule({
  declarations: [EzCheckboxComponent],
  exports: [EzCheckboxComponent],
  imports: [CommonModule, EzFormsModule],
})
export class EzCheckboxModule {}
