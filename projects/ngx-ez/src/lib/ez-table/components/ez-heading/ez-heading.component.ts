import { Component, Input } from '@angular/core';

@Component({
  selector: 'ez-heading',
  templateUrl: './ez-heading.component.html',
  styleUrls: ['./ez-heading.component.scss'],
})
export class EzHeadingComponent {
  @Input()
  title = '';

  @Input()
  class = '';

  @Input('columns')
  set columnsSet(value: string | number) {
    if (typeof value === 'string') {
      this.columns = parseInt(value);
    } else {
      this.columns = value;
    }
  }
  columns = 1;
}
