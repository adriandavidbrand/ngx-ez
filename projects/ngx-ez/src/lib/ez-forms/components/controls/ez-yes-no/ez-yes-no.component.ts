import { Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzFormReadonlyDirective } from '../../../directives/ez-form-readonly.directive';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';

@Component({
  selector: 'ez-yes-no',
  templateUrl: './ez-yes-no.component.html',
  styleUrls: ['./ez-yes-no.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzYesNoComponent }],
})
export class EzYesNoComponent extends EzControlBaseComponent {
  constructor(
    configService: EzFormConfigService,
    @Optional() configDirective: EzFormConfigDirective,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezReadonly: EzFormReadonlyDirective,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(configService, configDirective, ezForm, ezReadonly, ngControl);
  }
}
