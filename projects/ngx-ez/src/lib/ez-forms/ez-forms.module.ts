import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzControlComponent } from './components/ez-control/ez-control.component';
import { EzFormDirective } from './directives/ez-form.directive';
import { EzFormConfigDirective } from './directives/ez-form-config.directive';
import { ValidDirective } from './directives/valid.directive';
import { EzFormReadonlyDirective } from './directives/ez-form-readonly.directive';

@NgModule({
  declarations: [EzControlComponent, EzFormDirective, EzFormConfigDirective, ValidDirective, EzFormReadonlyDirective],
  imports: [CommonModule],
  exports: [EzControlComponent, EzFormDirective, EzFormConfigDirective, ValidDirective, EzFormReadonlyDirective],
})
export class EzFormsModule {}
