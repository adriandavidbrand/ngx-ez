import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzHeadingComponent } from './ez-heading.component';

describe('EzHeadingComponent', () => {
  let component: EzHeadingComponent;
  let fixture: ComponentFixture<EzHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
