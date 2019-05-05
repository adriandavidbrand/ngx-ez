import { Component, Input } from '@angular/core';

@Component({
  selector: 'ez-group',
  templateUrl: './ez-group.component.html',
  styleUrls: ['./ez-group.component.css']
})
export class EzGroupComponent {
  @Input()
  controlClasses: string | string[];

  @Input()
  labelClasses: string | string[];

  @Input()
  controlsClasses: string | string[];

  @Input()
  readonly = false;
}
