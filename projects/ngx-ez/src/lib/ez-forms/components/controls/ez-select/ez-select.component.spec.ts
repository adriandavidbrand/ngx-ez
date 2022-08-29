import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzFormsModule } from '../../../ez-forms.module';
import { EzSelectComponent } from './ez-select.component';

describe('EzSelectComponent', () => {
  let component: EzSelectComponent<any>;
  let fixture: ComponentFixture<EzSelectComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzSelectComponent],
      imports: [EzFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzSelectComponent);
    component = fixture.componentInstance;
    component.config = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
