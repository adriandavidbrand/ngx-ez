import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzRadioComponent } from './ez-radio.component';
import { EzFormsModule } from '../../../ez-forms.module';
import { ReferencePipeModule } from '../../../../pipes/reference/reference-pipe.module';

@NgModule({
  declarations: [EzRadioComponent],
  exports: [EzRadioComponent],
  imports: [CommonModule, EzFormsModule, ReferencePipeModule],
})
export class EzRadioModule {}
