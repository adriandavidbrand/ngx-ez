import { Component } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';

@Component({
  selector: 'ez-yes-no',
  templateUrl: './ez-yes-no.component.html',
  styleUrls: ['./ez-yes-no.component.scss'],
  providers: [
    { provide: EzControlBaseComponent, useExisting: EzYesNoComponent },
  ],
})
export class EzYesNoComponent extends EzControlBaseComponent<'Y' | 'N'> {}
