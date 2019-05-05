import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzTextComponent } from './ez-text.component';
import { EzTestingModule } from '../../../../ez-testing/ez-testing.module';

describe('EzTextComponent', () => {
  let component: EzTextComponent;
  let fixture: ComponentFixture<EzTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzTextComponent ],
      imports: [ EzTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
