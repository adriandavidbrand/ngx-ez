import { Component, Input, TemplateRef, ContentChild, input } from '@angular/core';
import { SortDirection } from 'ez-functions';

@Component({
  selector: 'ez-column',
  templateUrl: './ez-column.component.html',
  styleUrls: ['./ez-column.component.scss'],
  standalone: false,
})
export class EzColumnComponent {
  readonly property = input('');

  readonly heading = input<string>();

  readonly id = input<string>();

  @Input('sortable')
  set sortableSet(val: string | boolean) {
    this.sortable = val !== undefined && val !== false;
  }
  sortable = true;

  readonly compare = input<(a: any, b: any) => number>();

  readonly headingClass = input('');

  readonly headingId = input<string>();

  readonly cellClass = input('');

  readonly width = input<string>();

  readonly breakGrouping = input(true);

  direction?: SortDirection;

  @ContentChild(TemplateRef)
  template?: TemplateRef<any>;
}
