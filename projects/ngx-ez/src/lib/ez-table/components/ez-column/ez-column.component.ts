import { Component, Input, TemplateRef, ContentChild } from '@angular/core';

import { SortDirection } from '../../../ez-core/functions/multiple-sort';

@Component({
  selector: 'ez-column',
  templateUrl: './ez-column.component.html',
  styleUrls: ['./ez-column.component.css']
})
export class EzColumnComponent {
  @Input()
  property: string;

  @Input()
  heading: string;

  @Input('sortable')
  set setSortable(val: string | boolean) {
    this.sortable = val !== undefined && val !== false;
  }
  sortable: boolean = true;

  @Input()
  compare: (a: any, b: any) => number;

  @Input()
  display: (item: any) => string;

  direction: SortDirection;

  @ContentChild(TemplateRef)
  template: TemplateRef<any>;
}