import { Component, TemplateRef, input, contentChild } from '@angular/core';

@Component({
  selector: 'ez-footer',
  template: '',
  styleUrls: ['./ez-footer.component.scss'],
  standalone: false,
})
export class EzFooterComponent {
  readonly value = input<string>();

  readonly cellClass = input('');

  readonly display = input<(pageData: any[], data: any[]) => string>();

  readonly template = contentChild(TemplateRef);

  readonly columns = input(1, {
    transform: (value: number | string) => (typeof value === 'string' ? parseInt(value) : value),
  });
}
