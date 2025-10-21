import { Directive, input } from '@angular/core';

@Directive({
  selector: '[ezFormReadonly]',
  standalone: false,
})
export class EzFormReadonlyDirective {
  ezFormReadonly = input(false, { transform: (value: boolean | string) => value !== false && value !== 'false' });
}
