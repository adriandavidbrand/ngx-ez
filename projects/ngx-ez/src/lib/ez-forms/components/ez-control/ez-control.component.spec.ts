import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzControlComponent } from './ez-control.component';

describe('EzControlComponent', () => {
  let component: EzControlComponent;
  let fixture: ComponentFixture<EzControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
