import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxesRequiredDirective } from './checkboxes-required.directive';

@NgModule({
  declarations: [CheckboxesRequiredDirective],
  exports: [CheckboxesRequiredDirective],
  imports: [CommonModule],
})
export class CheckboxesRequiredValidatorModule {}
