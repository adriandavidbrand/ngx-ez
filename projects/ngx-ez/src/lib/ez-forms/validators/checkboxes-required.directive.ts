import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';
import { Option } from '../../ez-core/models/option';

@Directive({
  selector: '[checkboxes-required]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckboxesRequiredDirective,
      multi: true,
    },
  ],
})
export class CheckboxesRequiredDirective extends ValidatorBaseDirective implements Validator {
  @Input()
  options: Option[];

  constructor() {
    super('options');
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if (!c.value || (this.options && !this.options.find((option) => c.value[option.property] === true))) {
      return {
        required: true,
      };
    }

    return null;
  }
}
