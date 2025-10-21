import { Signal, WritableSignal } from '@angular/core';

export interface EzControlProperties {
  dirty: WritableSignal<boolean>;
  valid: WritableSignal<boolean>;
  invalid: WritableSignal<boolean>;
  pristine: WritableSignal<boolean>;
  submitted: WritableSignal<boolean>;
  message: WritableSignal<string>;
  fieldset: Signal<boolean>;
  labelledby: Signal<string>;
  maxlength: Signal<string>;
  name: Signal<string>;
  placeholder: Signal<string>;
  required: Signal<boolean>;
  readonly: Signal<boolean>;
}
