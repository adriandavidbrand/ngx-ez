import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SameDirective } from './same.directive';

@NgModule({
  declarations: [SameDirective],
  exports: [SameDirective],
  imports: [CommonModule],
})
export class SameValidatorModule {}
