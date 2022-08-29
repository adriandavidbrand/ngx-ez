import { SimpleChanges, OnChanges, Directive, Inject } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[validator-base]' })
export class ValidatorBaseDirective implements OnChanges {
  inputs: string[];

  onChange!: () => void;

  constructor(@Inject('') ...inputs: string[]) {
    this.inputs = inputs;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputs.some((input) => input in changes) && this.onChange) {
      this.onChange();
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
