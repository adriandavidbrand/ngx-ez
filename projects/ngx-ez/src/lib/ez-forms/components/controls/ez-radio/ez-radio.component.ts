import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';
import { deepEquals } from 'ez-functions';
import { EzFormsModule } from '../../../ez-forms.module';
import { ReferencePipe } from '../../../../pipes/reference/reference.pipe';

@Component({
  selector: 'ez-radio',
  templateUrl: './ez-radio.component.html',
  styleUrls: ['./ez-radio.component.scss'],
  imports: [CommonModule, EzFormsModule, ReferencePipe],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzRadioComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzRadioComponent<T> extends EzControlBaseComponent<T | undefined> {
  readonly options = input.required<Option<T>[]>();

  override writeValue(value: T) {
    super.writeValue(this.options()?.find((o) => deepEquals(o.value, value))?.value ?? value);
  }
}
