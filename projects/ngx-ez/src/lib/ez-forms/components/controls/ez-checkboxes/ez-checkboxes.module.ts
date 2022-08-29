import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzCheckboxesComponent } from './ez-checkboxes.component';
import { EzFormsModule } from '../../../ez-forms.module';

@NgModule({
  declarations: [EzCheckboxesComponent],
  exports: [EzCheckboxesComponent],
  imports: [CommonModule, EzFormsModule],
})
export class EzCheckboxesModule {}
