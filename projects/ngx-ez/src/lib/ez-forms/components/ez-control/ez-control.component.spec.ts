import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { EzControlComponent } from './ez-control.component';
import { EzControlBase } from '../ez-control-base';
import { firstEmitted } from '../../../ez-testing/first-emitted';

class EzControlBaseMock {
  required$ = new BehaviorSubject(false);
  readonly$ = new BehaviorSubject(false);
}

describe('EzControlComponent', () => {
  let component: EzControlComponent;
  let fixture: ComponentFixture<EzControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EzControlComponent],
      providers: [{ provide: EzControlBase, useClass: EzControlBaseMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show required', async(async () => {
    const service = TestBed.get(EzControlBase);
    service.required$.next(false);
    const showRequired = await firstEmitted(component.showRequired$);
    expect(showRequired).toBeFalsy();
  }));

  it('should show required', async(async () => {
    const service = TestBed.get(EzControlBase);
    service.required$.next(true);
    service.readonly$.next(false);
    const showRequired = await firstEmitted(component.showRequired$);
    expect(showRequired).toBeTruthy();
  }));

  it('should not show required on read only', async(async () => {
    const service = TestBed.get(EzControlBase);
    service.required$.next(true);
    service.readonly$.next(true);
    const showRequired = await firstEmitted(component.showRequired$);
    expect(showRequired).toBeFalsy();
  }));
});
