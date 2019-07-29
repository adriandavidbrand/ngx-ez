import { Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';
import { EzReadonlyDirective } from '../../../directives/ez-readonly.directive';

@Component({
  selector: 'ez-password',
  templateUrl: './ez-password.component.html',
  styleUrls: ['./ez-password.component.scss'],
  providers: [{ provide: EzControlBase, useExisting: EzPasswordComponent }]
})
export class EzPasswordComponent extends EzControlBase {
  constructor(
    configService: EzFormConfigService,
    @Optional() configDirective: EzFormConfigDirective,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezReadonly: EzReadonlyDirective,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(configService, configDirective, ezForm, ezReadonly, ngControl);
  }
}
