import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';
import { Option } from '../../../../ez-core/models/options';

@Component({
  selector: 'ez-radio',
  templateUrl: './ez-radio.component.html',
  styleUrls: ['./ez-radio.component.css'],
  providers: [{ provide: EzControlBase, useExisting: EzRadioComponent }]
})
export class EzRadioComponent extends EzControlBase {
  @Input()
  options: Option[];

  constructor(
    ezFormConfigService: EzFormConfigService,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezGroup: EzGroupComponent,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(ezFormConfigService, ezForm, ezGroup, ngControl);
  }
}
