import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzHeadingComponent } from './ez-heading.component';

describe('EzHeadingComponent', () => {
  let component: EzHeadingComponent;
  let fixture: ComponentFixture<EzHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EzHeadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EzHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('columnsSet should parse string', () => {
    component.columnsSet = '5';
    expect(component.columns).toEqual(5);
  });
});
