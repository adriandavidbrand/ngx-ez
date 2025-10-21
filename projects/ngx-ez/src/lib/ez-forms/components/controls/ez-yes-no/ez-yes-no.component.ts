import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormsModule } from '../../../ez-forms.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ez-yes-no',
  templateUrl: './ez-yes-no.component.html',
  styleUrls: ['./ez-yes-no.component.scss'],
  imports: [CommonModule, EzFormsModule],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzYesNoComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzYesNoComponent extends EzControlBaseComponent<'Y' | 'N'> {}
