import { Directive, input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';
import { Option } from '../models/option';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[checkboxes-required]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CheckboxesRequiredDirective, multi: true }],
    standalone: false
})
export class CheckboxesRequiredDirective extends ValidatorBaseDirective implements Validator {
  readonly options = input.required<Option<any>[]>();

  constructor() {
    super('options');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    const options = this.options();
    if (
      !c.value ||
      (options && !options.find((option) => option.property && c.value[option.property] === true))
    ) {
      return {
        required: true,
      };
    }

    return null;
  }
}
