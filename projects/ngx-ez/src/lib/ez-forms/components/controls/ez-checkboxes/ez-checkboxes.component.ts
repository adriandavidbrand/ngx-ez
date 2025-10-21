import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { Option } from '../../../models/option';
import { EzFormsModule } from '../../../ez-forms.module';
import { CommonModule } from '@angular/common';
import { ReferencePipe } from '../../../../pipes/reference/reference.pipe';

@Component({
  selector: 'ez-checkboxes',
  templateUrl: './ez-checkboxes.component.html',
  styleUrls: ['./ez-checkboxes.component.scss'],
  imports: [CommonModule, EzFormsModule, ReferencePipe],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxesComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzCheckboxesComponent extends EzControlBaseComponent<{ [key: string]: boolean }> {
  readonly options = input.required<Option<undefined>[]>();

  override writeValue(value: any) {
    if (value) {
      this.value = value;
    } else if (this.value && typeof this.value === 'object') {
      this.options().forEach((option) => {
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
