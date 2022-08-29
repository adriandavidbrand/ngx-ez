import { Component, Input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';

@Component({
  selector: 'ez-checkbox',
  templateUrl: './ez-checkbox.component.html',
  styleUrls: ['./ez-checkbox.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxComponent }],
})
export class EzCheckboxComponent extends EzControlBaseComponent<boolean> {
  @Input()
  sublabel?: string;

  @Input()
  disabled = false;
}
