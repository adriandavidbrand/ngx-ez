import { Component, Input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';

@Component({
  selector: 'ez-radio',
  templateUrl: './ez-radio.component.html',
  styleUrls: ['./ez-radio.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzRadioComponent }],
})
export class EzRadioComponent<T> extends EzControlBaseComponent<T | undefined> {
  @Input()
  options!: Option<T>[];
}
