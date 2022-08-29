import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[allowed]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AllowedDirective, multi: true }],
})
export class AllowedDirective extends ValidatorBaseDirective implements Validator {
  @Input()
  allowed!: string[];

  constructor() {
    super('allowed');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    if (c.value && this.allowed && !this.allowed.some((item) => item === c.value)) {
      return {
        allowed: 'Response is not allowed',
      };
    }

    return null;
  }
}
