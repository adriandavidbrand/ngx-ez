import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzFooterComponent } from './ez-footer.component';

describe('EzFooterComponent', () => {
  let component: EzFooterComponent;
  let fixture: ComponentFixture<EzFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EzFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EzFooterComponent);
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
