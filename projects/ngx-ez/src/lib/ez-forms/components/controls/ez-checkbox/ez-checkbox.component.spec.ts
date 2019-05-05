import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzCheckboxComponent } from './ez-checkbox.component';
import { EzTestingModule } from '../../../../ez-testing/ez-testing.module';

describe('EzCheckboxComponent', () => {
  let component: EzCheckboxComponent;
  let fixture: ComponentFixture<EzCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzCheckboxComponent ],
      imports: [ EzTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
