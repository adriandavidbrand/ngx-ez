import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormsModule } from '../../../ez-forms.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ez-checkbox',
  templateUrl: './ez-checkbox.component.html',
  styleUrls: ['./ez-checkbox.component.scss'],
  imports: [CommonModule, EzFormsModule],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzCheckboxComponent extends EzControlBaseComponent<boolean> {
  readonly sublabel = input<string>();

  readonly disabled = input(false);
}
