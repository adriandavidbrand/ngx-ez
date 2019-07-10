import { Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';
import { EzConfigDirective } from '../../../directives/ez-config.directive';

@Component({
  selector: 'ez-password',
  templateUrl: './ez-password.component.html',
  styleUrls: ['./ez-password.component.scss'],
  providers: [{ provide: EzControlBase, useExisting: EzPasswordComponent }]
})
export class EzPasswordComponent extends EzControlBase {
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
