import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EzTestHelper, EzFormsModule } from 'ngx-ez';
import { EzTableModule } from 'ngx-ez';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, EzFormsModule, EzTableModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let helper: EzTestHelper<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    helper = new EzTestHelper(fixture);
  });

  it('password should be invalid', async(async () => {
    const control = await helper.control('password');
    expect(control.invalid).toBeTruthy();
  }));

  it('password should be valid', async(async () => {
    component.model.password = 'some password';
    const control = await helper.control('password');
    expect(control.valid).toBeTruthy();
  }));

  it('password again should be invalid', async(async () => {
    component.model.password = 'some password';
    const control = await helper.control('passwordAgain');
    expect(control.invalid).toBeTruthy();
  }));

  it('password again should be valid', async(async () => {
    component.model.password = 'some password';
    component.passwordAgain = 'some password';
    const control = await helper.control('passwordAgain');
    expect(control.valid).toBeTruthy();
  }));
});
