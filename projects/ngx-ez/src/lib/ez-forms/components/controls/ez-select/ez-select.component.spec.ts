import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { EzSelectComponent } from './ez-select.component';
import { EzTestingModule } from '../../../../ez-testing/ez-testing.module';

describe('EzSelectComponent', () => {
  let component: EzSelectComponent;
  let fixture: ComponentFixture<EzSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzSelectComponent ],
      imports: [ EzTestingModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
