import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllowedDirective } from './allowed.directive';

@NgModule({
  declarations: [AllowedDirective],
  exports: [AllowedDirective],
  imports: [CommonModule],
})
export class AllowedValidatorModule {}
