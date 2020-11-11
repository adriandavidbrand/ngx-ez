import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTablePagerComponent } from './ez-table-pager.component';
import { EzTableComponent } from '../ez-table/ez-table.component';

class TableMock {
  data = [];
  pageData = [];
}

describe('EzTablePagerComponent', () => {
  let component: EzTablePagerComponent;
  let fixture: ComponentFixture<EzTablePagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzTablePagerComponent],
      providers: [{ provide: EzTableComponent, useClass: TableMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTablePagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
