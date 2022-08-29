import { EzFormDirective } from './ez-form.directive';
import { NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { EzFormConfigService } from '../services/ez-form-config.service';

describe('EzFormDirective', () => {
  let ngForm: NgForm;
  let form: ElementRef;
  let configService: EzFormConfigService;

  beforeEach(() => {
    ngForm = new NgForm([], []);
    form = new ElementRef(document.createElement('form'));
    configService = new EzFormConfigService();
  });

  it('should create an instance', () => {
    const directive = new EzFormDirective(ngForm, form, configService);
    expect(directive).toBeTruthy();
  });

  it('should add single formClass', () => {
    configService.formClasses = 'formClass';
    const _directive = new EzFormDirective(ngForm, form, configService);
    expect(form.nativeElement.classList.contains('formClass')).toBeTruthy();
  });

  it('should add multiple formClasses from string', () => {
    configService.formClasses = 'formClass1 formClass2';
    const _directive = new EzFormDirective(ngForm, form, configService);
    expect(form.nativeElement.classList.contains('formClass1')).toBeTruthy();
    expect(form.nativeElement.classList.contains('formClass2')).toBeTruthy();
  });

  it('should add multiple formClasses from array', () => {
    configService.formClasses = ['formClass1', 'formClass2'];
    const _directive = new EzFormDirective(ngForm, form, configService);
    expect(form.nativeElement.classList.contains('formClass1')).toBeTruthy();
    expect(form.nativeElement.classList.contains('formClass2')).toBeTruthy();
  });

  it('should add single formSubmittedClass on submit', () => {
    configService.formSubmittedClasses = 'formClass';
    const _directive = new EzFormDirective(ngForm, form, configService);
    ngForm.ngSubmit.emit();
    expect(form.nativeElement.classList.contains('formClass')).toBeTruthy();
  });

  it('should remove single formSubmittedClass on reset', () => {
    configService.formSubmittedClasses = 'formClass';
    const _directive = new EzFormDirective(ngForm, form, configService);
    ngForm.ngSubmit.emit();
    form.nativeElement.reset();
    expect(form.nativeElement.classList.contains('formClass')).toBeFalsy();
  });

  it('should add multiple formSubmittedClasses from string on submit', () => {
    configService.formSubmittedClasses = 'formClass1 formClass2';
    const _directive = new EzFormDirective(ngForm, form, configService);
    ngForm.ngSubmit.emit();
    expect(form.nativeElement.classList.contains('formClass1')).toBeTruthy();
    expect(form.nativeElement.classList.contains('formClass2')).toBeTruthy();
  });

  it('should add multiple formSubmittedClasses from array on submit', () => {
    configService.formSubmittedClasses = ['formClass1', 'formClass2'];
    const _directive = new EzFormDirective(ngForm, form, configService);
    ngForm.ngSubmit.emit();
    expect(form.nativeElement.classList.contains('formClass1')).toBeTruthy();
    expect(form.nativeElement.classList.contains('formClass2')).toBeTruthy();
  });

  it('should remove formSubmittedClasses on reset', () => {
    configService.formSubmittedClasses = ['formClass1', 'formClass2'];
    const _directive = new EzFormDirective(ngForm, form, configService);
    ngForm.ngSubmit.emit();
    form.nativeElement.reset();
    expect(form.nativeElement.classList.contains('formClass1')).toBeFalsy();
    expect(form.nativeElement.classList.contains('formClass2')).toBeFalsy();
  });
});
