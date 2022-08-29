import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzFormsModule } from '../../../ez-forms.module';
import { EzRadioComponent } from './ez-radio.component';

describe('EzRadioComponent', () => {
  let component: EzRadioComponent<any>;
  let fixture: ComponentFixture<EzRadioComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzRadioComponent],
      imports: [EzFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
