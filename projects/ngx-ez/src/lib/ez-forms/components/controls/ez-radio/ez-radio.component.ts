import { Component, Input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';
import { deepEquals } from 'ez-functions';

@Component({
  selector: 'ez-radio',
  templateUrl: './ez-radio.component.html',
  styleUrls: ['./ez-radio.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzRadioComponent }],
})
export class EzRadioComponent<T> extends EzControlBaseComponent<T | undefined> {
  @Input()
  options!: Option<T>[];

  override writeValue(value: T) {
    super.writeValue(this.options?.find((o) => deepEquals(o.value, value))?.value ?? value);
  }
}
