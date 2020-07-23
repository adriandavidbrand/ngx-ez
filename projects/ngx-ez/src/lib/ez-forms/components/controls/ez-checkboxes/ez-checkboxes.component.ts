import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { Option } from '../../../../ez-core/models/option';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';
import { EzFormReadonlyDirective } from '../../../directives/ez-form-readonly.directive';

@Component({
  selector: 'ez-checkboxes',
  templateUrl: './ez-checkboxes.component.html',
  styleUrls: ['./ez-checkboxes.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxesComponent }],
})
export class EzCheckboxesComponent extends EzControlBaseComponent {
  @Input()
  options: Option[];

  constructor(
    configService: EzFormConfigService,
    @Optional() configDirective: EzFormConfigDirective,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezReadonly: EzFormReadonlyDirective,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(configService, configDirective, ezForm, ezReadonly, ngControl);
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    } else if (this.value && typeof this.value === 'object') {
      this.options.forEach((option) => {
        this.value[option.property] = false;
      });
    }
  }

  onValueChange(input, option: Option) {
    this.value[option.property] = input.target.checked;
    this.propagateChange(this.value);
  }
}
