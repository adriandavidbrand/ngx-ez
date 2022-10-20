import { Component, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { EzFormConfigDirective } from '../../directives/ez-form-config.directive';
import { EzFormReadonlyDirective } from '../../directives/ez-form-readonly.directive';
import { EzFormDirective } from '../../directives/ez-form.directive';
import { EzControlProperties } from '../../models/ez-controls-properties';
import { EzFormConfig } from '../../models/ez-form-config';
import { EzFormConfigService } from '../../services/ez-form-config.service';
import { EzControlBaseComponent } from '../ez-control-base.component';

@Component({
  selector: 'ez-control',
  templateUrl: './ez-control.component.html',
  styleUrls: ['./ez-control.component.scss'],
})
export class EzControlComponent<T> implements OnDestroy {
  properties: EzControlProperties;

  config: EzFormConfig = this.ezFormConfigService;

  finalise$ = new Subject<void>();

  constructor(
    ezControlBaseComponent: EzControlBaseComponent<T>,
    private ezFormConfigService: EzFormConfigService,
    @Optional() ezFormReadonlyDirective: EzFormReadonlyDirective,
    @Optional() ezFormConfigDirective: EzFormConfigDirective,
    @Optional() ngControl: NgControl,
    @Optional() ezFormDirective: EzFormDirective
  ) {
    this.properties = ezControlBaseComponent.properties;
    ezFormDirective?.ezSubmit.pipe(takeUntil(this.finalise$)).subscribe(() => {
      this.properties.submitted = true;
    });
    ezFormDirective?.ezSubmitInvalid.pipe(takeUntil(this.finalise$)).subscribe(() => {
      this.properties.submitted = true;
    });
    ezFormDirective?.ezReset.pipe(takeUntil(this.finalise$)).subscribe(() => {
      this.properties.submitted = false;
    });
    if (ngControl) {
      ngControl.valueAccessor = ezControlBaseComponent;
      if (ngControl.valueChanges) {
        ngControl.valueChanges.pipe(takeUntil(this.finalise$)).subscribe(() => {
          this.properties.dirty = ngControl.dirty ?? false;
          this.properties.invalid = ngControl.invalid ?? false;
          this.properties.valid = ngControl.valid ?? false;
          this.properties.pristine = ngControl.pristine ?? false;
          if (ngControl.invalid) {
            const errorType = ngControl.errors ? Object.keys(ngControl.errors)[0] : '';
            const errorValue = ngControl?.errors ? ngControl.errors[errorType] : '';
            this.properties.message =
              ezControlBaseComponent.messages[errorType] ||
              this.config.defaultMessages[errorType] ||
              (typeof errorValue === 'string' ? errorValue : this.config.defaultMessages['invalid']);
          } else {
            this.properties.message = '';
          }
        });
      }
    }
    ezFormReadonlyDirective?.readonly$.pipe(takeUntil(this.finalise$)).subscribe((readonly) => {
      ezControlBaseComponent.metaData.directiveReadonly = readonly;
      ezControlBaseComponent.properties.readonly = readonly || ezControlBaseComponent.metaData.localReadonly;
    });
    ezControlBaseComponent.config = ezFormConfigService;
    ezFormConfigDirective?.config$.pipe(takeUntil(this.finalise$)).subscribe((config) => {
      this.config = config;
      ezControlBaseComponent.config = config;
    });
  }

  ngOnDestroy() {
    this.finalise$.next();
    this.finalise$.complete();
  }
}
