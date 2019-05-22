import { Component, Input, OnInit, Optional } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { EzControlBase } from '../ez-control-base';
import { firstTruthy } from '../../../ez-core/rxjs/first-truthy';

@Component({
  selector: 'ez-control',
  templateUrl: './ez-control.component.html',
  styleUrls: ['./ez-control.component.css']
})
export class EzControlComponent {
  @Input()
  fieldset: boolean | string = false;

  name$ = this.ezControl.name$;

  readonly$ = this.ezControl.readonly$;

  showRequired$ = combineLatest(
    this.ezControl.required$,
    firstTruthy(this.ezControl.ezForm && this.ezControl.ezForm.readonly$, this.readonly$))
  .pipe(
    map(([required, readonly]) => required && !readonly)
  );

  invalid$ = this.ezControl.invalid$;

  message$ = this.ezControl.message$;

  config$ = this.ezControl.config$;

  constructor(private ezControl: EzControlBase) {}
}
