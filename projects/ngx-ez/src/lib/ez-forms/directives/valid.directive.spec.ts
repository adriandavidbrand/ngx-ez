import { ElementRef } from '@angular/core';

import { ValidDirective } from './valid.directive';

describe('ValidDirective', () => {
  it('should create an instance', () => {
    const directive = new ValidDirective(new ElementRef(document.createElement('input')));
    expect(directive).toBeTruthy();
  });
});
