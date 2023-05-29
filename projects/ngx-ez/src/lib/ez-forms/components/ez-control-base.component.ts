import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { EzControlProperties } from '../models/ez-controls-properties';
import { EzFormConfig } from '../models/ez-form-config';

@Component({ selector: 'ez-control-base', template: '' })
export class EzControlBaseComponent<T> implements ControlValueAccessor {
  properties: EzControlProperties = {
    dirty: false,
    fieldset: false,
    invalid: false,
    labelledby: '',
    maxlength: '',
    message: '',
    name: '',
    placeholder: '',
    pristine: true,
    readonly: false,
    required: false,
    submitted: false,
    valid: true,
  };

  config!: EzFormConfig;

  metaData = {
    localReadonly: false,
    directiveReadonly: false,
  };

  @Input()
  set fieldset(value: boolean | string) {
    this.properties.fieldset = value !== false && value !== 'false';
  }

  @Input()
  set labelledby(value: string) {
    this.properties.labelledby = `${value}`;
  }

  @Input()
  set maxlength(value: string | number) {
    this.properties.maxlength = `${value}`;
  }

  @Input()
  set name(value: string) {
    this.properties.name = value;
  }

  @Input()
  set placeholder(value: string) {
    this.properties.placeholder = value;
  }

  @Input()
  set readonly(value: boolean | string) {
    this.metaData.localReadonly = value !== false && value !== 'false';
    this.properties.readonly = this.metaData.localReadonly || this.metaData.directiveReadonly;
  }

  @Input()
  set required(value: boolean | string) {
    this.properties.required = value !== false && value !== 'false';
  }

  @Input()
  messages: { [key: string]: string } = {};

  value?: T = undefined;

  writeValue(value: T) {
    this.value = value;
  }

  propagateChange: (value: T) => void = (_: T) => {};

  registerOnChange(fn: (value: T) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onChange(value: T) {
    this.value = value;
    this.propagateChange(this.value);
  }
}
