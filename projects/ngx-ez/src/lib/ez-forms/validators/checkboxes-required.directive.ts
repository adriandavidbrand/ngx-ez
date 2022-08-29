import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';
import { Option } from '../models/option';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[checkboxes-required]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckboxesRequiredDirective, multi: true }],
})
export class CheckboxesRequiredDirective extends ValidatorBaseDirective implements Validator {
  @Input()
  options!: Option<any>[];

  constructor() {
    super('options');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    if (
      !c.value ||
      (this.options && !this.options.find((option) => option.property && c.value[option.property] === true))
    ) {
      return {
        required: true,
      };
    }

    return null;
  }
}
