import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'ez-heading',
  templateUrl: './ez-heading.component.html',
  styleUrls: ['./ez-heading.component.scss'],
  standalone: false,
})
export class EzHeadingComponent {
  readonly title = input('');

  readonly class = input('');

  readonly columns = input(1, {
    transform: (value: string | number) => (typeof value === 'string' ? parseInt(value) : value),
  });
}
