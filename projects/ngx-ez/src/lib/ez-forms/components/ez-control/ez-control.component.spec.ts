import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzControlComponent } from './ez-control.component';
import { EzControlBaseComponent } from '../ez-control-base.component';

class EzControlBaseComponentMock {}

describe('EzControlComponent', () => {
  let component: EzControlComponent<any>;
  let fixture: ComponentFixture<EzControlComponent<any>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EzControlComponent],
        providers: [
          {
            provide: EzControlBaseComponent,
            useClass: EzControlBaseComponentMock,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EzControlComponent);
    component = fixture.componentInstance;
    component.properties = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
