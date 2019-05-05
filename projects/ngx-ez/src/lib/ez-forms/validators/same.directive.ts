import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBase } from './validator-base';

@Directive({
  selector: '[same]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: SameDirective, multi: true }
  ]
})
export class SameDirective extends ValidatorBase implements Validator {
  @Input()
  same: string[];

  constructor() {
    super('same');
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if (
      (c.value || this.same) && c.value !== this.same
    ) {
      return {
        same: 'Should be the same as other value'
      };
    }

    return null;
  }
}
