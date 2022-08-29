import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { deepMerge } from 'ez-functions';

import { EzFormConfig } from '../models/ez-form-config';
import { EzFormConfigService } from '../services/ez-form-config.service';

@Directive({
  selector: '[ezFormConfig]',
})
export class EzFormConfigDirective {
  config$ = new BehaviorSubject<EzFormConfig>(this.configService);
  @Input()
  set ezFormConfig(value: Partial<EzFormConfig>) {
    this.config$.next(deepMerge(this.configService, value));
  }

  constructor(public configService: EzFormConfigService) {}
}
