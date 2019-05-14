import { Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EzFormDirective } from '../directives/ez-form.directive';
import { EzFormConfigService } from '../services/ez-form-config.service';
import { EzGroupComponent } from './ez-group/ez-group.component';

export class EzControlBase implements ControlValueAccessor, OnDestroy {
  constructor(
    public ezFormConfigService: EzFormConfigService,
    public ezForm: EzFormDirective,
    public ezGroup: EzGroupComponent,
    public ngControl: NgControl
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
      this.subscription = ngControl.valueChanges.subscribe(() => {
        if (ngControl.invalid) {
          const errorType = Object.keys(ngControl.errors)[0];
          const errorValue = Object.values(ngControl.errors)[0];
          this.message =
            this.messages[errorType] ||
            ezFormConfigService.defaultMessages[errorType] ||
            (typeof errorValue === 'string'
              ? errorValue
              : ezFormConfigService.defaultMessages.invalid);
        } else {
          this.message = '';
        }
      });
    }
  }

  subscription: Subscription;

  @Input()
  name: string;
  @Input()
  required: string | boolean;
  @Input()
  maxlength: string;
  @Input()
  placeholder: string;
  @Input()
  messages: any = {};

  readonlyVal = false;
  @Input()
  set readonly(val: any) {
    this.readonlyVal = val !== undefined && val !== false;
  }

  get readonly() {
    return (
      (this.ezForm && this.ezForm.readonly) ||
      this.readonlyVal ||
      (this.ezGroup && this.ezGroup.readonly)
    );
  }

  controlClasses = (this.ezGroup && this.ezGroup.controlClasses) || this.ezFormConfigService.controlClasses;
  @Input('controlClasses')
  set controlClassesSet(val: string | string[]) {
    this.controlClasses = val || (this.ezGroup && this.ezGroup.controlClasses) || this.ezFormConfigService.controlClasses;
  }

  labelClasses = (this.ezGroup && this.ezGroup.labelClasses) || this.ezFormConfigService.labelClasses;
  @Input('labelClasses')
  set labelClassesSet(val: string | string[]) {
    this.labelClasses = val || (this.ezGroup && this.ezGroup.labelClasses) || this.ezFormConfigService.labelClasses;
  }

  controlsClasses = (this.ezGroup && this.ezGroup.controlsClasses) || this.ezFormConfigService.controlsClasses;
  @Input('controlsClasses')
  set controlsClassesSet(val: string | string[]) {
    this.controlsClasses = val || (this.ezGroup && this.ezGroup.controlsClasses) || this.ezFormConfigService.controlsClasses;
  }

  checkboxLabelClasses = this.ezFormConfigService.checkboxLabelClasses;

  radioLabelClasses = this.ezFormConfigService.radioLabelClasses;

  sublabelClasses = this.ezFormConfigService.sublabelClasses;

  readonlyClasses = this.ezFormConfigService.readonlyClasses;

  validationClasses = this.ezFormConfigService.validationClasses;

  inputClasses = this.ezFormConfigService.inputClasses;

  checkboxClasses = this.ezFormConfigService.checkboxClasses;

  radioClasses = this.ezFormConfigService.radioClasses;

  selectClasses = this.ezFormConfigService.selectClasses;

  message = '';

  value: any = null;

  get valid(): boolean {
    return this.ngControl && this.ngControl.valid;
  }

  get invalid(): boolean {
    return this.ngControl && this.ngControl.invalid;
  }

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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
