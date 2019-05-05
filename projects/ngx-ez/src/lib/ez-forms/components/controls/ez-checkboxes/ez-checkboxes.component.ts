import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';
import { Option } from '../../../../ez-core/models/options';

@Component({
  selector: 'ez-checkboxes',
  templateUrl: './ez-checkboxes.component.html',
  styleUrls: ['./ez-checkboxes.component.css'],
  providers: [{ provide: EzControlBase, useExisting: EzCheckboxesComponent }]
})
export class EzCheckboxesComponent extends EzControlBase {
  @Input()
  options: Option[];

  constructor(
    ezFormConfigService: EzFormConfigService,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezGroup: EzGroupComponent,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(ezFormConfigService, ezForm, ezGroup, ngControl);
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    } else if (this.value && typeof this.value === 'object') {
      this.options.forEach(option => {
        this.value[option.property] = false;
      });
    }
  }

  onValueChange(input, option: Option) {
    this.value[option.property] = input.target.checked;
    this.propagateChange(this.value);
  }
}
