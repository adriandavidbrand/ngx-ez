import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EzFormConfigService } from '../services/ez-form-config.service';

@Directive({
  selector: '[ez-config]'
})
export class EzConfigDirective {
  config$ = new BehaviorSubject<any>(this.configService);
  @Input()
  set config(value: any) {
    this.config$.next({ ...this.configService, ...value });
  }

  constructor(public configService: EzFormConfigService) {}
}
