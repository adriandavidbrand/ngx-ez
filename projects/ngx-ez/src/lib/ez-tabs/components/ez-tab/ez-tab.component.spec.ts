import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTabComponent } from './ez-tab.component';

describe('EzTabComponent', () => {
  let component: EzTabComponent;
  let fixture: ComponentFixture<EzTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EzTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EzTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
