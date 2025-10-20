import { Component, Input, ContentChild, TemplateRef, input } from '@angular/core';

@Component({
  selector: 'ez-footer',
  templateUrl: './ez-footer.component.html',
  styleUrls: ['./ez-footer.component.scss'],
  standalone: false,
})
export class EzFooterComponent {
  readonly value = input<string>();

  readonly cellClass = input('');

  readonly display = input<(pageData: any[], data: any[]) => string>();

  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<any>;

  readonly columns = input(1, {
    transform: (value: number | string) => (typeof value === 'string' ? parseInt(value) : value),
  });
}
