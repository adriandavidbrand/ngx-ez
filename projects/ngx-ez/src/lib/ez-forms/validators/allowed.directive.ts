import { Directive, input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[allowed]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AllowedDirective, multi: true }],
    standalone: false
})
export class AllowedDirective extends ValidatorBaseDirective implements Validator {
  readonly allowed = input.required<string[]>();

  constructor() {
    super('allowed');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    const allowed = this.allowed();
    if (c.value && allowed && !allowed.some((item) => item === c.value)) {
      return {
        allowed: 'Response is not allowed',
      };
    }

    return null;
  }
}
