import { Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EzFormDirective } from '../directives/ez-form.directive';
import { EzFormConfigService } from '../services/ez-form-config.service';
import { PushStack } from '../../ez-core/rxjs/push-stack';
import { firstTruthy } from '../../ez-core/rxjs/first-truthy';
import { EzFormConfigDirective } from '../directives/ez-form-config.directive';
import { EzReadonlyDirective } from '../directives/ez-readonly.directive';

export class EzControlBase implements ControlValueAccessor, OnDestroy {
  constructor(
    public configService: EzFormConfigService,
    public configDirective: EzFormConfigDirective,
    public ezForm: EzFormDirective,
    public ezReadonly: EzReadonlyDirective,
    public ngControl: NgControl
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
      ngControl.valueChanges.pipe(takeUntil(this.finalise)).subscribe(() => {
        if (ngControl.valid !== this.valid$.getValue()) {
          this.valid$.next(ngControl.valid);
        }
        if (ngControl.invalid !== this.invalid$.getValue()) {
          this.invalid$.next(ngControl.invalid);
        }
        if (ngControl.invalid) {
          const errorType = Object.keys(ngControl.errors)[0];
          const errorValue = Object.values(ngControl.errors)[0];
          this.message$.next(
            this.messages[errorType] ||
              configService.defaultMessages[errorType] ||
              (typeof errorValue === 'string' ? errorValue : configService.defaultMessages.invalid)
          );
        } else {
          this.message$.next('');
        }
      });
    }
  }

  finalise = new Subject<void>();

  @Input()
  messages: any = {};

  name$ = new BehaviorSubject<string>(undefined);
  @Input()
  set name(value: string) {
    this.name$.next(value);
  }

  maxlength$ = new BehaviorSubject<string>(undefined);
  @Input()
  set maxlength(value: string) {
    this.maxlength$.next(value);
  }

  placeholder$ = new BehaviorSubject<string>(undefined);
  @Input()
  set placeholder(value: string) {
    this.placeholder$.next(value);
  }

  required$ = new BehaviorSubject(false);
  @Input()
  set required(value: string | boolean) {
    this.required$.next(value !== undefined && value !== false);
  }

  readonly$ = new PushStack(
    false,
    false,
    firstTruthy(this.ezForm && this.ezForm.readonly$, this.ezReadonly && this.ezReadonly.readonly$)
  );
  @Input()
  set readonly(val: any) {
    this.readonly$.next(val !== undefined && val !== false);
  }

  valid$ = new BehaviorSubject(false);

  invalid$ = new BehaviorSubject(false);

  message$ = new BehaviorSubject('');

  config$: Observable<any> = this.configDirective ? this.configDirective.config$ : of(this.configService);

  value: any = null;

  writeValue(value: any) {
    this.value = value;
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onChange(value: any) {
    this.value = value;
    this.propagateChange(this.value);
  }

  ngOnDestroy() {
    this.finalise.next();
  }
}
