import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model = {
    text: '',
    yesno: 'Y',
    select: 1,
    radio: null,
    checkbox: false,
    checkboxes: { prop1: false, prop2: true, prop3: false },
    password: null
  };

  passwordAgain = '';

  readonly = false;

  tableData = [
    { firstName: 'Billy', lastName: 'Bob' },
    { firstName: 'Mary', lastName: 'Joe' },
    { firstName: 'Sue', lastName: 'Harris' },
    { firstName: 'Bob', lastName: 'Walker' },
    { firstName: 'Harry', lastName: 'Jones' },
    { firstName: 'Hillary', lastName: 'Smith' },
    { firstName: 'Joe', lastName: 'Jones' }
  ];

  onSubmit() {
    console.log('Submitted');
  }
}
