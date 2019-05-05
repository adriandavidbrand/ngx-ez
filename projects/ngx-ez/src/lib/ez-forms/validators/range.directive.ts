import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBase } from './validator-base';

@Directive({
  selector: '[range]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RangeDirective, multi: true }]
})
export class RangeDirective extends ValidatorBase implements Validator {
  @Input()
  set range(range: string) {
    const [lower, upper] = range.split('-');
    this.lower = parseFloat(lower);
    this.upper = parseFloat(upper);
  }

  private lower: number;

  private upper: number;

  constructor() {
    super('range');
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if (c.value) {
      const value = parseFloat(c.value);
      if ((value < this.lower || value > this.upper)) {
        return {
          range: `Should be between ${this.lower} and ${this.upper}`
        };
      }
    }

    return null;
  }
}
