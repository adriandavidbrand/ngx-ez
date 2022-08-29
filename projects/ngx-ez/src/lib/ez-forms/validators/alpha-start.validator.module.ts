import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlphaStartDirective } from './alpha-start.directive';

@NgModule({
  declarations: [AlphaStartDirective],
  exports: [AlphaStartDirective],
  imports: [CommonModule],
})
export class AphaSTartValidatorModule {}
