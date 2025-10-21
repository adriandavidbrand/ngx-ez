import { Component, computed, Optional, signal } from '@angular/core';
import { NgControl } from '@angular/forms';

import { EzFormConfigDirective } from '../../directives/ez-form-config.directive';
import { EzFormReadonlyDirective } from '../../directives/ez-form-readonly.directive';
import { EzFormDirective } from '../../directives/ez-form.directive';
import { EzControlProperties } from '../../models/ez-controls-properties';
import { EzFormConfig } from '../../models/ez-form-config';
import { EzFormConfigService } from '../../services/ez-form-config.service';
import { EzControlBaseComponent } from '../ez-control-base.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ez-control',
  templateUrl: './ez-control.component.html',
  styleUrls: ['./ez-control.component.scss'],
  standalone: false,
})
export class EzControlComponent<T> {
  properties: EzControlProperties = {
    dirty: signal(this.ngControl.dirty ?? false),
    valid: signal(this.ngControl.valid ?? false),
    invalid: signal(this.ngControl.invalid ?? false),
    pristine: signal(this.ngControl.pristine ?? false),
    submitted: signal(false),
    message: signal(''),
    fieldset: this.ezControlBaseComponent.fieldset,
    labelledby: this.ezControlBaseComponent.labelledby,
    maxlength: this.ezControlBaseComponent.maxlength,
    name: this.ezControlBaseComponent.name,
    placeholder: this.ezControlBaseComponent.placeholder,
    required: this.ezControlBaseComponent.required,
    readonly: computed(() => this.ezControlBaseComponent.readonly() || this.ezFormReadonlyDirective?.ezFormReadonly()),
  };

  config: EzFormConfig = this.ezFormConfigService;

  constructor(
    private ezControlBaseComponent: EzControlBaseComponent<T>,
    private ezFormConfigService: EzFormConfigService,
    @Optional() private ezFormReadonlyDirective: EzFormReadonlyDirective,
    @Optional() ezFormConfigDirective: EzFormConfigDirective,
    @Optional() private ngControl: NgControl,
    @Optional() ezFormDirective: EzFormDirective
  ) {
    ezFormDirective?.ezSubmit.pipe(takeUntilDestroyed()).subscribe(() => {
      this.properties.submitted.set(true);
    });
    ezFormDirective?.ezSubmitInvalid.pipe(takeUntilDestroyed()).subscribe(() => {
      this.properties.submitted.set(true);
    });
    ezFormDirective?.ezReset.pipe(takeUntilDestroyed()).subscribe(() => {
      this.properties.submitted.set(false);
    });
    if (ngControl) {
      ngControl.valueAccessor = ezControlBaseComponent;
      if (ngControl.valueChanges) {
        ngControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
          this.properties.dirty.set(ngControl.dirty ?? false);
          this.properties.invalid.set(ngControl.invalid ?? false);
          this.properties.valid.set(ngControl.valid ?? false);
          this.properties.pristine.set(ngControl.pristine ?? false);
          if (ngControl.invalid) {
            const errorType = ngControl.errors ? Object.keys(ngControl.errors)[0] : '';
            const errorValue = ngControl?.errors ? ngControl.errors[errorType] : '';
            this.properties.message.set(
              ezControlBaseComponent.messages()[errorType] ||
                this.config.defaultMessages[errorType] ||
                (typeof errorValue === 'string' ? errorValue : this.config.defaultMessages['invalid'])
            );
          } else {
            this.properties.message.set('');
          }
        });
      }
    }
    ezControlBaseComponent.config = ezFormConfigService;
    ezControlBaseComponent.properties = this.properties;
    ezFormConfigDirective?.config$.pipe(takeUntilDestroyed()).subscribe((config) => {
      this.config = config;
      ezControlBaseComponent.config = config;
    });
  }
}
