import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';
import { Option } from '../../../../ez-core/models/option';
import { EzConfigDirective } from '../../../directives/ez-config.directive';

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
    @Optional() configDirective: EzConfigDirective,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezGroup: EzGroupComponent,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(configService, configDirective, ezForm, ezGroup, ngControl);
  }
}
