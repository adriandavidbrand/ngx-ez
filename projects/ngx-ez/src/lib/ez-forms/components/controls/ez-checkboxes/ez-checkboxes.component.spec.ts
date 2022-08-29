import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EzFormsModule } from '../../../ez-forms.module';

import { EzCheckboxesComponent } from './ez-checkboxes.component';

describe('EzCheckboxesComponent', () => {
  let component: EzCheckboxesComponent;
  let fixture: ComponentFixture<EzCheckboxesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzCheckboxesComponent],
      imports: [EzFormsModule],
    }).compileComponents();
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
