import { Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';
import { EzConfigDirective } from '../../../directives/ez-config.directive';

@Component({
  selector: 'ez-yes-no',
  templateUrl: './ez-yes-no.component.html',
  styleUrls: ['./ez-yes-no.component.css'],
  providers: [{ provide: EzControlBase, useExisting: EzYesNoComponent }]
})
export class EzYesNoComponent extends EzControlBase {
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
