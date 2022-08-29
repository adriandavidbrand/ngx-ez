import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { ValidatorBaseDirective } from './validator-base.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[range]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RangeDirective, multi: true }],
})
export class RangeDirective extends ValidatorBaseDirective implements Validator {
  @Input()
  set range(range: string) {
    const [lower, upper] = range.split('-');
    this.lower = parseFloat(lower);
    this.upper = parseFloat(upper);
  }

  private lower!: number;

  private upper!: number;

  constructor() {
    super('range');
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    if (c.value) {
      const value = parseFloat(c.value);
      if (isNaN(value) || value < this.lower || value > this.upper) {
        return {
          range: `Should be between ${this.lower} and ${this.upper}`,
        };
      }
    }

    return null;
  }
}
