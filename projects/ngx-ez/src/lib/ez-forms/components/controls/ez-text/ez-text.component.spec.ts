import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EzFormsModule } from '../../../ez-forms.module';

import { EzTextComponent } from './ez-text.component';

describe('EzTextComponent', () => {
  let component: EzTextComponent;
  let fixture: ComponentFixture<EzTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EzTextComponent],
      imports: [EzFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTextComponent);
    component = fixture.componentInstance;
    component.config = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
