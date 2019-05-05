import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTablePagerComponent } from './ez-table-pager.component';

describe('EzTablePagerComponent', () => {
  let component: EzTablePagerComponent;
  let fixture: ComponentFixture<EzTablePagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzTablePagerComponent ]
    })
    .compileComponents();
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
