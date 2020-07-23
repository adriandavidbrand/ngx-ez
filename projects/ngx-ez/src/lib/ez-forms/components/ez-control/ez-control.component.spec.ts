import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { EzControlComponent } from './ez-control.component';
import { EzControlBaseComponent } from '../ez-control-base.component';
import { firstEmitted } from '../../../ez-core/functions/first-emitted';

class EzControlBaseComponentMock {
  required$ = new BehaviorSubject(false);
  readonly$ = new BehaviorSubject(false);
}

describe('EzControlComponent', () => {
  let component: EzControlComponent;
  let fixture: ComponentFixture<EzControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EzControlComponent],
      providers: [{ provide: EzControlBaseComponent, useClass: EzControlBaseComponentMock }],
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
    const service = TestBed.get(EzControlBaseComponent);
    service.required$.next(false);
    const showRequired = await firstEmitted(component.showRequired$);
    expect(showRequired).toBeFalsy();
  }));

  it('should show required', async(async () => {
    const service = TestBed.get(EzControlBaseComponent);
    service.required$.next(true);
    service.readonly$.next(false);
    const showRequired = await firstEmitted(component.showRequired$);
    expect(showRequired).toBeTruthy();
  }));

  it('should not show required on read only', async(async () => {
    const service = TestBed.get(EzControlBaseComponent);
    service.required$.next(true);
    service.readonly$.next(true);
    const showRequired = await firstEmitted(component.showRequired$);
    expect(showRequired).toBeFalsy();
  }));
});
