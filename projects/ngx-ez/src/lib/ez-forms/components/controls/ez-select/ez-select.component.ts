import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';
import { deepEquals } from 'ez-functions';
import { EzFormsModule } from '../../../ez-forms.module';
import { CommonModule } from '@angular/common';
import { ReferencePipe } from '../../../../pipes/reference/reference.pipe';

@Component({
  selector: 'ez-select',
  templateUrl: './ez-select.component.html',
  styleUrls: ['./ez-select.component.scss'],
  imports: [CommonModule, EzFormsModule, ReferencePipe],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzSelectComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzSelectComponent<T> extends EzControlBaseComponent<T | undefined> {
  readonly options = input.required<Option<T>[]>();

  readonly showDefault = input(true);

  readonly defaultText = input('Please select..');

  readonly defaultValue = input(undefined);

  override writeValue(value: T) {
    super.writeValue(this.options()?.find((o) => deepEquals(o.value, value))?.value ?? value);
  }

  lookupIndex(index: string) {
    super.onChange(index === '-1' ? this.defaultValue() : this.options()[parseInt(index)]?.value);
  }
}
