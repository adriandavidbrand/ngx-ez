import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTableSearchComponent } from './ez-table-search.component';

describe('EzTableSearchComponent', () => {
  let component: EzTableSearchComponent;
  let fixture: ComponentFixture<EzTableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzTableSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
