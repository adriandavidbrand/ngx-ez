import { Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';

@Component({
  selector: 'ez-password',
  templateUrl: './ez-password.component.html',
  styleUrls: ['./ez-password.component.css'],
  providers: [{ provide: EzControlBase, useExisting: EzPasswordComponent }]
})
export class EzPasswordComponent extends EzControlBase {
  constructor(
    ezFormConfigService: EzFormConfigService,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezGroup: EzGroupComponent,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(ezFormConfigService, ezForm, ezGroup, ngControl);
  }
}
