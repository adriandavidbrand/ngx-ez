import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormsModule } from '../../../ez-forms.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ez-password',
  templateUrl: './ez-password.component.html',
  styleUrls: ['./ez-password.component.scss'],
  imports: [CommonModule, EzFormsModule],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzPasswordComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzPasswordComponent extends EzControlBaseComponent<string> {}
