import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTableComponent } from './ez-table.component';
import { EzColumnComponent } from '../ez-column/ez-column.component';
import { SortDirection } from '../../../ez-core/functions/multiple-sort';

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
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(1);
    expect(component.pageNums[0]).toEqual(1);
    expect(component.pageNums[9]).toEqual(10);
  });

  it('page nums should be from 1 to 10 for page 6', () => {
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(6);
    expect(component.pageNums[0]).toEqual(1);
    expect(component.pageNums[9]).toEqual(10);
  });

  it('page nums should be from 2 to 11 for page 7', () => {
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(7);
    expect(component.pageNums[0]).toEqual(2);
    expect(component.pageNums[9]).toEqual(11);
  });

  it('page nums should be from 10 to 19 for page 15', () => {
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(15);
    expect(component.pageNums[0]).toEqual(10);
    expect(component.pageNums[9]).toEqual(19);
  });

  it('page nums should be from 11 to 20 for page 16', () => {
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(16);
    expect(component.pageNums[0]).toEqual(11);
    expect(component.pageNums[9]).toEqual(20);
  });

  it('page nums should be from 11 to 20 for page 20', () => {
    component.data = Array.from({ length: 200 }, (_, i) => i + 1);
    component.pageSize = 10;
    component.goto(20);
    expect(component.pageNums[0]).toEqual(11);
    expect(component.pageNums[9]).toEqual(20);
  });

  it('sort should add column to columnSort', () => {
    const column = new EzColumnComponent();
    component.sort(column, false);
    expect(component.columnSort.length).toEqual(1);
  });

  it('sort should set direction ascending', () => {
    const column = new EzColumnComponent();
    component.sort(column, false);
    expect(column.direction).toEqual(SortDirection.ascending);
  });

  it('sort on current column should reverse order', () => {
    const column = new EzColumnComponent();
    component.sort(column, false);
    component.sort(column, false);
    expect(column.direction).toEqual(SortDirection.descending);
    component.sort(column, false);
    expect(column.direction).toEqual(SortDirection.ascending);
  });

  it('sort without multi should replace column', () => {
    const column = new EzColumnComponent();
    component.sort(column, false);
    component.sort(new EzColumnComponent(), false);
    expect(component.columnSort.length).toEqual(1);
    expect(component.columnSort[0]).not.toEqual(column);
  });

  it('sort without multi should remove direction', () => {
    const column = new EzColumnComponent();
    component.sort(column, false);
    component.sort(new EzColumnComponent(), false);
    expect(column.direction).toBeUndefined();
  });

  it('sort with multi should add another column', () => {
    const column = new EzColumnComponent();
    component.sort(column, false);
    component.sort(new EzColumnComponent(), true);
    expect(component.columnSort.length).toEqual(2);
    expect(component.columnSort[0]).toEqual(column);
  });

  it('groupBySet with string should create groupBy object', () => {
    component.groupBySet = 'prop1 prop2';
    expect(component.groupBy.keys.length).toEqual(2);
  });

  it('pageSizeSet should parse string', () => {
    component.pageSizeSet = '5';
    expect(component.pageSize).toEqual(5);
  });

  it('search should filter results', () => {
    component.data = [{ prop: 'a' }, { prop: 'b' }];
    const column = new EzColumnComponent();
    column.property = 'prop';
    component.columns.reset([column]);
    component.search = 'b';
    component.goto(1);
    expect(component.pageData.length).toEqual(1);
  });

  it('search should ignore case', () => {
    component.data = [{ prop: 'A' }];
    const column = new EzColumnComponent();
    column.property = 'prop';
    component.columns.reset([column]);
    component.search = 'a';
    component.goto(1);
    expect(component.pageData.length).toEqual(1);
  });

  it('search should match output of display function', () => {
    component.data = [{}];
    const column = new EzColumnComponent();
    column.display = () => 'output';
    component.columns.reset([column]);
    component.search = 'output';
    component.goto(1);
    expect(component.pageData.length).toEqual(1);
  });
});
