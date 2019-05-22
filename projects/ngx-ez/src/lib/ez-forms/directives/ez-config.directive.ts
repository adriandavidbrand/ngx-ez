import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[ez-config]'
})
export class EzConfigDirective {
  config$ = new BehaviorSubject<any>(undefined);
  @Input()
  set config(value: any) {
    this.config$.next(value);
  }
}
