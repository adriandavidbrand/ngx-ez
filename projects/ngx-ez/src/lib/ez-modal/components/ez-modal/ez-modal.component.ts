import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { trapFocus } from 'ez-functions';

@Component({
  selector: 'ez-modal',
  templateUrl: './ez-modal.component.html',
  styleUrls: ['./ez-modal.component.scss'],
})
export class EzModalComponent implements OnDestroy, AfterContentInit {
  visible = false;
  @Input()
  heading = '';

  @Input()
  autoOpen = false;

  @Output()
  afterClosed = new EventEmitter();

  private openSub?: Subscription;
  @Input()
  set open$(open$: Observable<any>) {
    if (this.openSub) {
      this.openSub.unsubscribe();
    }
    this.openSub = open$.subscribe(() => {
      if (!this.visible) {
        this.open();
      }
    });
  }

  private closeSub?: Subscription;
  @Input()
  set close$(close$: Observable<any>) {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    this.closeSub = close$.subscribe(() => {
      if (this.visible) {
        this.close();
      }
    });
  }

  constructor(private elementRef: ElementRef) {}

  close() {
    this.visible = false;
    this.afterClosed.emit();
  }

  open() {
    this.visible = true;
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      const autoFocus = element.querySelector('.auto-focus, [autofocus]');
      if (autoFocus) {
        autoFocus.focus();
      } else {
        const heading = element.querySelector('app-modal .modal-head h1');
        if (heading) {
          heading.focus();
        }
      }
      trapFocus(element.querySelector('.ez-modal'));
      element.addEventListener('keyup', (e: any) => {
        if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
          this.close();
        }
      });
    });
  }

  ngOnDestroy() {
    this.openSub?.unsubscribe();
    this.closeSub?.unsubscribe();
  }

  ngAfterContentInit() {
    if (this.autoOpen) {
      this.open();
    }
  }
}
