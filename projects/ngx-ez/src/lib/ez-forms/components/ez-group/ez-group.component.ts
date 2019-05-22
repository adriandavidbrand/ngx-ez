import { Component, Input } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ez-group',
  templateUrl: './ez-group.component.html',
  styleUrls: ['./ez-group.component.css']
})
export class EzGroupComponent {
  readonly$ = new BehaviorSubject(false);
  @Input()
  set readonly(value: boolean) {
    this.readonly$.next(value);
  }
}
