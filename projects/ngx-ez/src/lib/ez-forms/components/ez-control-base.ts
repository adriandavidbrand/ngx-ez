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

  _readonly = false;
  @Input()
  set readonly(val: any) {
    this._readonly = val !== undefined && val !== false;
  }

  get readonly() {
    return (
      (this.ezForm && this.ezForm.readonly) ||
      this._readonly ||
      (this.ezGroup && this.ezGroup.readonly)
    );
  }

  _controlClasses: string | string[];
  @Input()
  set controlClasses(val: string | string[]) {
    this._controlClasses = val;
  }

  get controlClasses(): string | string[] {
    return (
      this._controlClasses ||
      (this.ezGroup && this.ezGroup.controlClasses) ||
      this.ezFormConfigService.controlClasses
    );
  }

  _labelClasses: string | string[];
  @Input()
  set labelClasses(val: string | string[]) {
    this._labelClasses = val;
  }

  get labelClasses(): string | string[] {
    return (
      this._labelClasses ||
      (this.ezGroup && this.ezGroup.labelClasses) ||
      this.ezFormConfigService.labelClasses
    );
  }

  _controlsClasses: string | string[];
  @Input()
  set controlsClasses(val: string | string[]) {
    this._controlsClasses = val;
  }

  get controlsClasses(): string | string[] {
    return (
      this._controlsClasses ||
      (this.ezGroup && this.ezGroup.controlsClasses) ||
      this.ezFormConfigService.controlsClasses
    );
  }

  get checkboxLabelClasses(): string | string[] {
    return this.ezFormConfigService.checkboxLabelClasses;
  }

  get radioLabelClasses(): string | string[] {
    return this.ezFormConfigService.radioLabelClasses;
  }

  get sublabelClasses(): string | string[] {
    return this.ezFormConfigService.sublabelClasses;
  }

  get readonlyClasses(): string | string[] {
    return this.ezFormConfigService.readonlyClasses;
  }

  get validationClasses(): string | string[] {
    return this.ezFormConfigService.validationClasses;
  }

  get inputClasses(): string | string[] {
    return this.ezFormConfigService.inputClasses;
  }

  get checkboxClasses(): string | string[] {
    return this.ezFormConfigService.checkboxClasses;
  }

  get radioClasses(): string | string[] {
    return this.ezFormConfigService.radioClasses;
  }

  get selectClasses(): string | string[] {
    return this.ezFormConfigService.selectClasses;
  }

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
