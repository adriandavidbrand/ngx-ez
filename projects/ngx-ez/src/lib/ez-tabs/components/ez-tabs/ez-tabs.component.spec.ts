import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTabsComponent } from './ez-tabs.component';

describe('EzTabsComponent', () => {
  let component: EzTabsComponent;
  let fixture: ComponentFixture<EzTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EzTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EzTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
