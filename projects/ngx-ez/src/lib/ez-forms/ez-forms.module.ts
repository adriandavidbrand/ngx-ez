import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EzControlComponent } from './components/ez-control/ez-control.component';
import { EzGroupComponent } from './components/ez-group/ez-group.component';
import { EzCheckboxComponent } from './components/controls/ez-checkbox/ez-checkbox.component';
import { EzCheckboxesComponent } from './components/controls/ez-checkboxes/ez-checkboxes.component';
import { EzRadioComponent } from './components/controls/ez-radio/ez-radio.component';
import { EzSelectComponent } from './components/controls/ez-select/ez-select.component';
import { EzTextComponent } from './components/controls/ez-text/ez-text.component';
import { EzYesNoComponent } from './components/controls/ez-yes-no/ez-yes-no.component';
import { EzFormDirective } from './directives/ez-form.directive';
import { AllowedDirective } from './validators/allowed.directive';
import { AlphaStartDirective } from './validators/alpha-start.directive';
import { CheckboxesRequiredDirective } from './validators/checkboxes-required.directive';
import { RangeDirective } from './validators/range.directive';
import { ValidatorDirective } from './validators/validator.directive';
import { EzCoreModule } from '../ez-core/ez-core.module';
import { EzPasswordComponent } from './components/controls/ez-password/ez-password.component';
import { SameDirective } from './validators/same.directive';

@NgModule({
  declarations: [
    EzControlComponent,
    EzGroupComponent,
    EzCheckboxComponent,
    EzCheckboxesComponent,
    EzRadioComponent,
    EzSelectComponent,
    EzTextComponent,
    EzYesNoComponent,
    EzFormDirective,
    AllowedDirective,
    AlphaStartDirective,
    CheckboxesRequiredDirective,
    RangeDirective,
    ValidatorDirective,
    EzPasswordComponent,
    SameDirective
  ],
  imports: [CommonModule, FormsModule, EzCoreModule],
  exports: [
    EzControlComponent,
    EzGroupComponent,
    EzCheckboxComponent,
    EzCheckboxesComponent,
    EzRadioComponent,
    EzSelectComponent,
    EzTextComponent,
    EzYesNoComponent,
    EzFormDirective,
    AllowedDirective,
    AlphaStartDirective,
    CheckboxesRequiredDirective,
    RangeDirective,
    ValidatorDirective,
    EzPasswordComponent,
    SameDirective
  ]
})
export class EzFormsModule {}
