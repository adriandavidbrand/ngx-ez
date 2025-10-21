import { Component, TemplateRef, input, contentChild, model } from '@angular/core';
import { SortDirection } from 'ez-functions';

@Component({
  selector: 'ez-column',
  template: '',
  styleUrls: ['./ez-column.component.scss'],
  standalone: false,
})
export class EzColumnComponent {
  readonly property = input('');

  readonly heading = input<string>();

  readonly id = input<string>();

  readonly sortable = input(true, { transform: (value: string | boolean) => value !== 'false' && value !== false });

  readonly compare = input<(a: any, b: any) => number>();

  readonly headingClass = input('');

  readonly headingId = input<string>();

  readonly cellClass = input('');

  readonly width = input<string>();

  readonly breakGrouping = input(true);

  readonly sortDirection = model<SortDirection>();

  readonly template = contentChild(TemplateRef);
}
