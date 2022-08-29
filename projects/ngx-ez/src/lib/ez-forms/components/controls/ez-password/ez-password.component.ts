import { Component } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';

@Component({
  selector: 'ez-password',
  templateUrl: './ez-password.component.html',
  styleUrls: ['./ez-password.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzPasswordComponent }],
})
export class EzPasswordComponent extends EzControlBaseComponent<string> {}
