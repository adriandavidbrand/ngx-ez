import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzFormsModule } from '../../../ez-forms.module';
import { EzYesNoComponent } from './ez-yes-no.component';

describe('EzYesNoComponent', () => {
  let component: EzYesNoComponent;
  let fixture: ComponentFixture<EzYesNoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzYesNoComponent],
      imports: [EzFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzYesNoComponent);
    component = fixture.componentInstance;
    component.config = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
