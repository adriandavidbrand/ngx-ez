import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzSelectComponent } from './ez-select.component';
import { EzFormsModule } from '../../../ez-forms.module';
import { ReferencePipeModule } from '../../../../pipes/reference/reference-pipe.module';

@NgModule({
  declarations: [EzSelectComponent],
  exports: [EzSelectComponent],
  imports: [CommonModule, EzFormsModule, ReferencePipeModule],
})
export class EzSelectModule {}
