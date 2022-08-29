import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EzFormsModule } from '../../../ez-forms.module';

import { EzPasswordComponent } from './ez-password.component';

describe('EzPasswordComponent', () => {
  let component: EzPasswordComponent;
  let fixture: ComponentFixture<EzPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzPasswordComponent],
      imports: [EzFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzPasswordComponent);
    component = fixture.componentInstance;
    component.config = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
