import { Component, Input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';

@Component({
  selector: 'ez-checkboxes',
  templateUrl: './ez-checkboxes.component.html',
  styleUrls: ['./ez-checkboxes.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxesComponent }],
})
export class EzCheckboxesComponent extends EzControlBaseComponent<{ [key: string]: boolean; }> {
  @Input()
  options!: Option<undefined>[];

  override writeValue(value: any) {
    if (value) {
      this.value = value;
    } else if (this.value && typeof this.value === 'object') {
      this.options.forEach((option) => {
        this.value && (this.value[option.property ?? ''] = false);
      });
    }
  }

  onValueChange(input: any, option: Option<any>) {
    if (this.value) {
      this.value[option.property ?? ''] = input.target.checked;
      this.propagateChange(this.value);
    }
  }
}
