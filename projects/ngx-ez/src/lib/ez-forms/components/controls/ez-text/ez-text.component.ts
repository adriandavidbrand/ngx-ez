import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormsModule } from '../../../ez-forms.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ez-text',
  templateUrl: './ez-text.component.html',
  styleUrls: ['./ez-text.component.scss'],
  imports: [CommonModule, EzFormsModule],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzTextComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzTextComponent extends EzControlBaseComponent<string> {}
