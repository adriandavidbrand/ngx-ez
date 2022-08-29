import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTableComponent } from '../ez-table/ez-table.component';
import { EzTablePagerComponent } from './ez-table-pager.component';

class TableMock {
  data = [];
  pageData = [];
  config = {};
}

describe('EzTablePagerComponent', () => {
  let component: EzTablePagerComponent;
  let fixture: ComponentFixture<EzTablePagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EzTablePagerComponent],
      providers: [{ provide: EzTableComponent, useClass: TableMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTablePagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
