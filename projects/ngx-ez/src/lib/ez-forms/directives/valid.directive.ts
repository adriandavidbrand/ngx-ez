import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[valid]',
})
export class ValidDirective {
  @Input()
  set valid(value: boolean) {
    this.el.nativeElement.setCustomValidity(value ? '' : 'invalid');
  }

  constructor(private el: ElementRef) {}
}
