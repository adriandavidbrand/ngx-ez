import { Component, Input, ViewEncapsulation } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { EzControlBaseComponent } from '../ez-control-base.component';

@Component({
  selector: 'ez-control',
  templateUrl: './ez-control.component.html',
  styleUrls: ['./ez-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EzControlComponent {
  fieldset = false;
  @Input('fieldset')
  set fieldsetSet(fieldset: boolean | string) {
    this.fieldset = fieldset !== false;
  }

  name$ = this.ezControl.name$;

  readonly$ = this.ezControl.readonly$;

  showRequired$ = combineLatest([this.ezControl.required$, this.readonly$]).pipe(
    map(([required, readonly]) => required && !readonly)
  );

  invalid$ = this.ezControl.invalid$;

  labelledby$ = this.ezControl.labelledby$;

  message$ = this.ezControl.message$;

  config$ = this.ezControl.config$;

  constructor(private ezControl: EzControlBaseComponent) {}
}
