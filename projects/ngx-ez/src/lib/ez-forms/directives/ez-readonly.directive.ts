import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[ezReadonly]'
})
export class EzReadonlyDirective {
  readonly$ = new BehaviorSubject<boolean>(false);
  @Input()
  set ezReadonly(value: boolean) {
    this.readonly$.next(value);
  }
}
