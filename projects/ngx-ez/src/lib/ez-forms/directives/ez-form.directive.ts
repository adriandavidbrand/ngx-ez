import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';

import { EzFormConfigService } from '../services/ez-form-config.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form',
  exportAs: 'ezForm',
  standalone: false,
})
export class EzFormDirective {
  @Output()
  ezSubmit: EventEmitter<any> = new EventEmitter();

  @Output()
  ezSubmitInvalid: EventEmitter<any> = new EventEmitter();

  @Output()
  ezReset: EventEmitter<any> = new EventEmitter();

  private formSubmittedClasses!: string[];

  constructor(private form: NgForm, private el: ElementRef, configService: EzFormConfigService) {
    const elm = el.nativeElement;
    elm.classList.add('ez-form');
    if (configService.formClasses) {
      if (typeof configService.formClasses === 'string') {
        configService.formClasses.split(' ').forEach((formClass) => {
          elm.classList.add(formClass);
        });
      } else if (Array.isArray(configService.formClasses)) {
        configService.formClasses.forEach((formClass) => {
          elm.classList.add(formClass);
        });
      }
    }
    if (configService.formSubmittedClasses) {
      if (typeof configService.formSubmittedClasses === 'string') {
        this.formSubmittedClasses = configService.formSubmittedClasses.split(' ');
      } else if (Array.isArray(configService.formSubmittedClasses)) {
        this.formSubmittedClasses = configService.formSubmittedClasses;
      }
    }
    form.ngSubmit.pipe(takeUntilDestroyed()).subscribe(() => {
      this.onSubmit(el.nativeElement);
      if (form.valid) {
        this.ezSubmit.emit(form.value);
      } else {
        this.ezSubmitInvalid.emit(form.value);
      }
    });
    elm.addEventListener('reset', () => {
      this.reset();
    });
  }

  private onSubmit(elm: any) {
    elm.classList.add('ez-submitted');
    if (this.formSubmittedClasses) {
      this.formSubmittedClasses.forEach((formClass) => {
        elm.classList.add(formClass);
      });
    }
    const invalid = elm.querySelector(
      '.ng-invalid .ng-invalid input, .ng-invalid .ng-invalid select, .ng-invalid .ng-invalid textarea'
    );
    if (invalid) {
      invalid.focus();
    } else {
      const validation = elm.querySelector('.ng-invalid .ng-invalid .ez-validation');
      if (validation) {
        validation.scrollIntoView();
        validation.focus();
      }
    }
  }

  reset(value?: any) {
    const elm = this.el.nativeElement;
    elm.classList.remove('ez-submitted');
    if (this.formSubmittedClasses) {
      this.formSubmittedClasses.forEach((formClass) => {
        elm.classList.remove(formClass);
      });
    }
    this.form.resetForm(value);
    this.ezReset.emit(value);
  }
}
