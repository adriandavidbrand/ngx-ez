import { Component, Input, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { EzFormConfigService } from '../../services/ez-form-config.service';
import { EzConfigDirective } from '../../directives/ez-config.directive';

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

  config$: Observable<any> = this.configDirective ? this.configDirective.config$ : of(this.configService);

  constructor(private configService: EzFormConfigService, @Optional() private configDirective: EzConfigDirective) {}
}
