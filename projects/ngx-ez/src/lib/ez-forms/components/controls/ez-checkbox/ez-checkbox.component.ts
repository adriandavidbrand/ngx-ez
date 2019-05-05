import { Component, Optional, Self, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBase } from '../../ez-control-base';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzGroupComponent } from '../../ez-group/ez-group.component';

@Component({
  selector: 'ez-checkbox',
  templateUrl: './ez-checkbox.component.html',
  styleUrls: ['./ez-checkbox.component.css'],
  providers: [{ provide: EzControlBase, useExisting: EzCheckboxComponent }]
})
export class EzCheckboxComponent extends EzControlBase {
  @Input()
  sublabel: string;

  @Input()
  disabled = false;

  constructor(
    ezFormConfigService: EzFormConfigService,
    @Optional() ezForm: EzFormDirective,
    @Optional() ezGroup: EzGroupComponent,
    @Self() @Optional() ngControl: NgControl
  ) {
    super(ezFormConfigService, ezForm, ezGroup, ngControl);
  }
}
