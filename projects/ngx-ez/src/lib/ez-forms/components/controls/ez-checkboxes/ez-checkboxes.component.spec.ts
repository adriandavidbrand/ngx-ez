import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzCheckboxesComponent } from './ez-checkboxes.component';
import { EzTestingModule } from '../../../../ez-testing/ez-testing.module';

describe('EzCheckboxesComponent', () => {
  let component: EzCheckboxesComponent;
  let fixture: ComponentFixture<EzCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzCheckboxesComponent ],
      imports: [ EzTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
