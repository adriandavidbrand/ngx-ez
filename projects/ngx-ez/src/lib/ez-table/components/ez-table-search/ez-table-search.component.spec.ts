import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTableSearchComponent } from './ez-table-search.component';
import { EzTableComponent } from '../ez-table/ez-table.component';

class TableMock {
  data = [];
}

describe('EzTableSearchComponent', () => {
  let component: EzTableSearchComponent;
  let fixture: ComponentFixture<EzTableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EzTableSearchComponent],
      providers: [{ provide: EzTableComponent, useClass: TableMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
