import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[ezFormReadonly]',
})
export class EzFormReadonlyDirective {
  readonly$ = new BehaviorSubject<boolean>(false);
  @Input()
  set ezFormReadonly(value: boolean | string) {
    this.readonly$.next(value !== false && value !== 'false');
  }
}
