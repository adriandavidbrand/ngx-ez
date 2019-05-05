import {
  Directive,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ez-form]'
})
export class EzFormDirective implements OnDestroy {
  @Output()
  ezSubmit: EventEmitter<void> = new EventEmitter();

  readonly = false;
  @Input('readonly')
  set setReadonly(val: any) {
    if (val) {
      this.el.nativeElement.classList.add('ez-form-readonly');
    } else {
      this.el.nativeElement.classList.remove('ez-form-readonly');
    }
    this.readonly = val !== undefined && val !== false ? true : false;
  }

  private subscription: Subscription;

  constructor(form: NgForm, private el: ElementRef) {
    el.nativeElement.classList.add('ez-form');
    this.subscription = form.ngSubmit.subscribe(_ => {
      this.onSubmit(el.nativeElement);
      if (form.valid) {
        this.ezSubmit.emit();
      }
    });
    el.nativeElement.addEventListener('reset', () => {
      el.nativeElement.classList.remove('ez-submitted');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(elm) {
    elm.classList.add('ez-submitted');
    const invalid = elm.querySelector(
      '.ng-invalid .ng-invalid input, .ng-invalid .ng-invalid select, .ng-invalid .ng-invalid textarea'
    );
    if (invalid) {
      invalid.focus();
    } else {
      const validation = elm.querySelector(
        '.ng-invalid .ng-invalid .ez-validation'
      );
      if (validation) {
        validation.scrollIntoView();
        validation.focus();
      }
    }
  }
}
