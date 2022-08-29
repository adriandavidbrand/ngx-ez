import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzPasswordComponent } from './ez-password.component';
import { EzFormsModule } from '../../../ez-forms.module';

@NgModule({
  declarations: [EzPasswordComponent],
  exports: [EzPasswordComponent],
  imports: [CommonModule, EzFormsModule],
})
export class EzPasswordModule {}
