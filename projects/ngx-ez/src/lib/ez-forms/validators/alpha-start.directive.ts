import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[alpha-start]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphaStartDirective, multi: true }],
})
export class AlphaStartDirective implements Validator {
  constructor() {}

  validate(c: AbstractControl): { [key: string]: any } | null {
    if (c.value && !/^[A-Za-z]/.test(c.value)) {
      return {
        alphaStart: 'Should start with a letter',
      };
    }

    return null;
  }
}
