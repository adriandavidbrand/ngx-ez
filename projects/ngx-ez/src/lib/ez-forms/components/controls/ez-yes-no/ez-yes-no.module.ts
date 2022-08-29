import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzYesNoComponent } from './ez-yes-no.component';
import { EzFormsModule } from '../../../ez-forms.module';

@NgModule({
  declarations: [EzYesNoComponent],
  exports: [EzYesNoComponent],
  imports: [CommonModule, EzFormsModule],
})
export class EzYesNoModule {}
