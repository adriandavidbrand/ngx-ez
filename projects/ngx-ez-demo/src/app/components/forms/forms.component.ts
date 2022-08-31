import { Component } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  model = {
    text: '',
    yesno: 'Y',
    select: 1,
    radio: null,
    checkbox: false,
    checkboxes: { prop1: false, prop2: true, prop3: false },
    password: '',
  };

  passwordAgain = '';

  readonly = false;

  onSubmit(val: any) {
    console.log('Submitted', val);
  }
}
