import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  EzCheckboxesModule,
  EzCheckboxModule,
  EzFormsModule,
  EzPasswordModule,
  EzSelectModule,
  EzTextModule,
  EzYesNoModule,
  SameValidatorModule,
} from 'ngx-ez';
import { EzRadioModule } from 'projects/ngx-ez/src/public-api';

import { FormsComponent } from './forms.component';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsComponent],
      imports: [
        FormsModule,
        EzFormsModule,
        EzTextModule,
        EzYesNoModule,
        EzSelectModule,
        EzRadioModule,
        EzCheckboxModule,
        EzCheckboxesModule,
        EzPasswordModule,
        SameValidatorModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
