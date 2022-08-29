import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzColumnComponent } from './ez-column.component';

describe('EzColumnComponent', () => {
  let component: EzColumnComponent;
  let fixture: ComponentFixture<EzColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EzColumnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EzColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sortableSet should set sortable true with true', () => {
    component.sortableSet = true;
    expect(component.sortable).toBeTruthy();
  });

  it('sortableSet should set sortable true with string', () => {
    component.sortableSet = '';
    expect(component.sortable).toBeTruthy();
  });

  it('sortableSet should not set sortable true with false', () => {
    component.sortableSet = false;
    expect(component.sortable).toBeFalsy();
  });
});
