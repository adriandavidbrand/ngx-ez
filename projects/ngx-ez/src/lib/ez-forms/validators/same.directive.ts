import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';

@Directive({
  selector: '[same]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SameDirective, multi: true }],
})
export class SameDirective extends ValidatorBaseDirective implements Validator {
  @Input()
  same: string[];

  constructor() {
    super('same');
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if ((c.value || this.same) && c.value !== this.same) {
      return {
        same: 'Should be the same as other value',
      };
    }

    return null;
  }
}
