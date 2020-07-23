import { Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzControlBaseComponent } from '../../ez-control-base.component';
import { EzFormDirective } from '../../../directives/ez-form.directive';
import { EzFormConfigService } from '../../../services/ez-form-config.service';
import { EzFormConfigDirective } from '../../../directives/ez-form-config.directive';
import { EzFormReadonlyDirective } from '../../../directives/ez-form-readonly.directive';

@Component({
  selector: 'ez-text',
  templateUrl: './ez-text.component.html',
  styleUrls: ['./ez-text.component.scss'],
  providers: [{ provide: EzControlBaseComponent, useExisting: EzTextComponent }],
})
export class EzTextComponent extends EzControlBaseComponent {
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
