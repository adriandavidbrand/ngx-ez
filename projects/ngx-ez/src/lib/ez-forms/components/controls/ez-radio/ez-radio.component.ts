import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { Option } from '../../../../ez-core/models/option';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';
import { EzFormReadonlyDirective } from '../../../directives/ez-form-readonly.directive';

@Component({
  selector: 'ez-radio',
  templateUrl: './ez-radio.component.html',
  styleUrls: ['./ez-radio.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzRadioComponent }],
})
export class EzRadioComponent extends EzControlBaseComponent {
  @Input()
  options: Option[];

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
