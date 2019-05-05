import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzGroupComponent } from './ez-group.component';

describe('EzGroupComponent', () => {
  let component: EzGroupComponent;
  let fixture: ComponentFixture<EzGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
