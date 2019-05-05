import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { EzRadioComponent } from './ez-radio.component';
import { EzTestingModule } from '../../../../ez-testing/ez-testing.module';

describe('EzRadioComponent', () => {
  let component: EzRadioComponent;
  let fixture: ComponentFixture<EzRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzRadioComponent ],
      imports: [ EzTestingModule, FormsModule ]
    })
    .compileComponents();
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
