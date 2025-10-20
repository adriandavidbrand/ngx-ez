import { Component, input } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';

@Component({
    selector: 'ez-checkbox',
    templateUrl: './ez-checkbox.component.html',
    styleUrls: ['./ez-checkbox.component.scss'],
    providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxComponent }],
    standalone: false
})
export class EzCheckboxComponent extends EzControlBaseComponent<boolean> {
  readonly sublabel = input<string>();

  readonly disabled = input(false);
}
