import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTableComponent } from './ez-table.component';

describe('EzTableComponent', () => {
  let component: EzTableComponent;
  let fixture: ComponentFixture<EzTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EzTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('page nums should be from 1 to 10 for page 1', () => {
    expect(component).toBeTruthy();
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(1);
    expect(component.pageNums[0]).toEqual(1);
    expect(component.pageNums[9]).toEqual(10);
  });

  it('page nums should be from 1 to 10 for page 6', () => {
    expect(component).toBeTruthy();
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(6);
    expect(component.pageNums[0]).toEqual(1);
    expect(component.pageNums[9]).toEqual(10);
  });

  it('page nums should be from 2 to 11 for page 7', () => {
    expect(component).toBeTruthy();
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(7);
    expect(component.pageNums[0]).toEqual(2);
    expect(component.pageNums[9]).toEqual(11);
  });

  it('page nums should be from 10 to 19 for page 15', () => {
    expect(component).toBeTruthy();
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(15);
    expect(component.pageNums[0]).toEqual(10);
    expect(component.pageNums[9]).toEqual(19);
  });

  it('page nums should be from 11 to 20 for page 16', () => {
    expect(component).toBeTruthy();
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(16);
    expect(component.pageNums[0]).toEqual(11);
    expect(component.pageNums[9]).toEqual(20);
  });

  it('page nums should be from 11 to 20 for page 20', () => {
    expect(component).toBeTruthy();
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(20);
    expect(component.pageNums[0]).toEqual(11);
    expect(component.pageNums[9]).toEqual(20);
  });
});
