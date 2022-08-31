import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzModalComponent } from './ez-modal.component';

describe('EzModalComponent', () => {
  let component: EzModalComponent;
  let fixture: ComponentFixture<EzModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EzModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EzModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
