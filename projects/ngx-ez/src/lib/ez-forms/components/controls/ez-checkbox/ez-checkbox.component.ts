import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';
import { EzFormReadonlyDirective } from '../../../directives/ez-form-readonly.directive';

@Component({
  selector: 'ez-checkbox',
  templateUrl: './ez-checkbox.component.html',
  styleUrls: ['./ez-checkbox.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzCheckboxComponent }],
})
export class EzCheckboxComponent extends EzControlBaseComponent {
  @Input()
  sublabel: string;

  @Input()
  disabled = false;

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
