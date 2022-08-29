import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EzFormsModule } from '../../../ez-forms.module';

import { EzCheckboxComponent } from './ez-checkbox.component';

describe('EzCheckboxComponent', () => {
  let component: EzCheckboxComponent;
  let fixture: ComponentFixture<EzCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzCheckboxComponent],
      imports: [EzFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzCheckboxComponent);
    component = fixture.componentInstance;
    component.config = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
