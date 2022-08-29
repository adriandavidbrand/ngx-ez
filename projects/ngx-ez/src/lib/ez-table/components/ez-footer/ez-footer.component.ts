import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ez-footer',
  templateUrl: './ez-footer.component.html',
  styleUrls: ['./ez-footer.component.scss'],
})
export class EzFooterComponent {
  @Input()
  value?: string;

  @Input()
  cellClass = '';

  @Input()
  display?: (pageData: any[], data: any[]) => string;

  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<any>;

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
