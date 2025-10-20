import { Component, EventEmitter, Output, TemplateRef, ViewChild, input } from '@angular/core';

@Component({
  selector: 'ez-tab',
  templateUrl: './ez-tab.component.html',
  styleUrls: ['./ez-tab.component.scss'],
  standalone: false,
})
export class EzTabComponent {
  readonly heading = input.required<string>();

  readonly name = input.required<string>();

  readonly route = input<string>();

  readonly disabled = input(false);

  @Output()
  tabSelected = new EventEmitter();

  @ViewChild(TemplateRef)
  template?: TemplateRef<any>;
}
