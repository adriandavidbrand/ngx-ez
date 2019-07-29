import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { Option } from '../../../../ez-core/models/option';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';
import { EzReadonlyDirective } from '../../../directives/ez-readonly.directive';

@Component({
  selector: 'ez-select',
  templateUrl: './ez-select.component.html',
  styleUrls: ['./ez-select.component.scss'],
  providers: [{ provide: EzControlBase, useExisting: EzSelectComponent }]
})
export class EzSelectComponent extends EzControlBase {
  @Input()
  options: Option[];
  @Input()
  showDefault = true;
  @Input()
  defaultText = 'Please select..';
  @Input()
  defaultValue = null;

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
