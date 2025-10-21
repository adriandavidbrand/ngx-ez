import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { EzFormConfig } from '../models/ez-form-config';
import { EzControlProperties } from '../models/ez-controls-properties';

@Component({
  selector: 'ez-control-base',
  template: '',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EzControlBaseComponent<T> implements ControlValueAccessor {
  config!: EzFormConfig;
  properties!: EzControlProperties;

  readonly fieldset = input(false, { transform: (value: boolean | string) => value !== false && value !== 'false' });

  readonly labelledby = input('', { transform: (value: number | string) => `${value}` });

  readonly maxlength = input('', { transform: (value: number | string) => `${value}` });

  readonly name = input('');

  readonly placeholder = input('');

  readonly readonly = input(false, { transform: (value: boolean | string) => value !== false && value !== 'false' });

  readonly required = input(false, { transform: (value: boolean | string) => value !== false && value !== 'false' });

  readonly messages = input<{
    [key: string]: string;
  }>({});

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
    if (this.value !== value) {
      this.value = value;
      this.propagateChange(this.value);
    }
  }
}
