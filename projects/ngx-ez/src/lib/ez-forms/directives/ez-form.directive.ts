import { Directive, ElementRef, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';

import { EzFormConfigService } from '../services/ez-form-config.service';

@Directive({
  selector: '[ez-form]'
})
export class EzFormDirective implements OnDestroy {
  @Output()
  ezSubmit: EventEmitter<void> = new EventEmitter();

  readonly$ = new BehaviorSubject(false);
  @Input()
  set readonly(val: any) {
    if (val) {
      this.el.nativeElement.classList.add('ez-form-readonly');
    } else {
      this.el.nativeElement.classList.remove('ez-form-readonly');
    }
    this.readonly$.next(val !== undefined && val !== false);
  }

  private subscription: Subscription;

  private formSubmittedClasses: string[];

  constructor(form: NgForm, private el: ElementRef, configService: EzFormConfigService) {
    const elm = el.nativeElement;
    elm.classList.add('ez-form');
    if (configService.formClasses) {
      if (typeof configService.formClasses === 'string') {
        configService.formClasses.split(' ').forEach(formClass => {
          elm.classList.add(formClass);
        });
      } else if (Array.isArray(configService.formClasses)) {
        configService.formClasses.forEach(formClass => {
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
    this.subscription = form.ngSubmit.subscribe(() => {
      this.onSubmit(el.nativeElement);
      if (form.valid) {
        this.ezSubmit.emit();
      }
    });
    elm.addEventListener('reset', () => {
      elm.classList.remove('ez-submitted');
      if (this.formSubmittedClasses) {
        this.formSubmittedClasses.forEach(formClass => {
          elm.classList.remove(formClass);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(elm) {
    elm.classList.add('ez-submitted');
    if (this.formSubmittedClasses) {
      this.formSubmittedClasses.forEach(formClass => {
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
}
