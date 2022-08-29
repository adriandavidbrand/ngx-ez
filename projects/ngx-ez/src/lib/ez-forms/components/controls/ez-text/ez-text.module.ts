import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzTextComponent } from './ez-text.component';
import { EzFormsModule } from '../../../ez-forms.module';

@NgModule({
  declarations: [EzTextComponent],
  exports: [EzTextComponent],
  imports: [CommonModule, EzFormsModule],
})
export class EzTextModule {}
