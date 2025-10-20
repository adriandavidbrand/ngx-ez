import { Directive, input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[same]',
    providers: [{ provide: NG_VALIDATORS, useExisting: SameDirective, multi: true }],
    standalone: false
})
export class SameDirective extends ValidatorBaseDirective implements Validator {
  readonly same = input.required<string>();

  constructor() {
    super('same');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    const same = this.same();
    if ((c.value || same) && c.value !== same) {
      return {
        same: 'Should be the same as other value',
      };
    }

    return null;
  }
}
