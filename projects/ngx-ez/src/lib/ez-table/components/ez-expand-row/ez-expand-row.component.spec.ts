import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzExpandRowComponent } from './ez-expand-row.component';

describe('EzExpandRowComponent', () => {
  let component: EzExpandRowComponent;
  let fixture: ComponentFixture<EzExpandRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EzExpandRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EzExpandRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
