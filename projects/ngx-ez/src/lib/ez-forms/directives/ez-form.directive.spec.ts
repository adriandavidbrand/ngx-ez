import { EzFormDirective } from './ez-form.directive';
import { NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';

describe('EzFormDirective', () => {
  it('should create an instance', () => {
    const directive = new EzFormDirective(new NgForm([], []), new ElementRef(document.createElement('form')));
    expect(directive).toBeTruthy();
  });
});
