import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzColumnComponent } from './ez-column.component';

describe('EzColumnComponent', () => {
  let component: EzColumnComponent;
  let fixture: ComponentFixture<EzColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
