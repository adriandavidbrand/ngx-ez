import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EzFormConfigService } from '../services/ez-form-config.service';

@Directive({
  selector: '[ezFormConfig]'
})
export class EzFormConfigDirective {
  config$ = new BehaviorSubject<any>(this.configService);
  @Input()
  set ezFormConfig(value: any) {
    this.config$.next({ ...this.configService, ...value });
  }

  constructor(public configService: EzFormConfigService) {}
}
