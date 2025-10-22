import { Component, TemplateRef, contentChild } from '@angular/core';

@Component({
  selector: 'ez-expand-row',
  template: '',
  standalone: false,
})
export class EzExpandRowComponent {
  readonly template = contentChild(TemplateRef);
}
