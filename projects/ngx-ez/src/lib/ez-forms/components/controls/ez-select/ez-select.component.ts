import { Component, Input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';

@Component({
  selector: 'ez-select',
  templateUrl: './ez-select.component.html',
  styleUrls: ['./ez-select.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzSelectComponent }],
})
export class EzSelectComponent<T> extends EzControlBaseComponent<T | undefined> {
  @Input()
  options!: Option<T>[];

  @Input()
  showDefault = true;

  @Input()
  defaultText = 'Please select..';

  @Input()
  defaultValue = undefined;
}
