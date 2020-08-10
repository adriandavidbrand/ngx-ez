import { Component, Input, TemplateRef, ContentChild } from '@angular/core';

import { SortDirection } from 'ez-functions';

@Component({
  selector: 'ez-column',
  templateUrl: './ez-column.component.html',
  styleUrls: ['./ez-column.component.scss'],
})
export class EzColumnComponent {
  @Input()
  property: string;

  @Input()
  heading: string;

  @Input()
  id: string;

  @Input('sortable')
  set sortableSet(val: string | boolean) {
    this.sortable = val !== undefined && val !== false;
  }
  sortable = true;

  @Input()
  compare: (a: any, b: any) => number;

  @Input()
  display: (item: any) => string;

  @Input()
  headingClass: string;

  @Input()
  headingId: string;

  @Input()
  cellClass: string;

  @Input()
  width: string;

  @Input()
  breakGrouping = true;

  direction: SortDirection;

  @ContentChild(TemplateRef)
  template: TemplateRef<any>;
}
