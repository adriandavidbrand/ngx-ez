import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RangeDirective } from './range.directive';

@NgModule({
  declarations: [RangeDirective],
  exports: [RangeDirective],
  imports: [CommonModule],
})
export class RangeValidatorModule {}
