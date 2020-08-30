# ngx-ez

Easy Angular is a collection of components to help build Angular apps in a template driven style.

## Why?
Easy Angular removes a lot of the repetition and boilerplate from building Angular apps. New junior devs will be building WCAG compliant components that pass accessibility testing the first time without even knowing it.

## Usage

npm install --save ngx-ez

## Forms

Add the EzFormsModule to your module and you are ready to build Easy Forms.

[Testbed on StackBlitz](https://stackblitz.com/edit/angular-8brst8?file=src%2Fapp%2Fapp.component.html)

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EzFormsModule } from 'ngx-ez';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, EzFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

On a form you add the ezForm directive and an (ezSubmit) event handler that will only fire if the form is valid.

```html
<form ezForm (ezSubmit)="onSubmit()" [ezFormReadonly]="readonly"></form>
```

Now you can add form controls with the directives ez-text, ez-select, ez-radio, ez-checkbox and ez-checkboxes.

```html
<form ezForm (ezSubmit)="onSubmit()" [ezFormReadonly]="readonly">
  <ez-text name="text" [(ngModel)]="model.text" required range="4-6">
    Text
  </ez-text>

  <ez-yes-no name="yesno" [(ngModel)]="model.yesno" required>
    Yes/No
  </ez-yes-no>

  <ez-select
    name="select"
    [(ngModel)]="model.select"
    [options]="[{ value: 1, label: 'Select 1' }, { value: 2, label: 'Select 2' }]"
    required
  >
    Select
  </ez-select>

  <ez-radio
    name="radio"
    [(ngModel)]="model.radio"
    [options]="[{ value: 1, label: 'Radio 1' }, { value: 2, label: 'Radio 2' }]"
    required
  >
    Radio
  </ez-radio>

  <ez-checkbox name="checkbox" [(ngModel)]="model.checkbox">
    Checkbox
  </ez-checkbox>

  <ez-checkboxes
    name="checkboxes"
    [(ngModel)]="model.checkboxes"
    [options]="[{ property: 'prop1', label: 'Checkbox 1' }, { property: 'prop2', label: 'Checkbox 2' }, { property: 'prop3', label: 'Checkbox 3' }]"
    checkboxes-required
    [messages]="{ required: 'Please select at least one option' }"
  >
    Checkboxes
  </ez-checkboxes>

  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
  <button type="button" (click)="readonly = !readonly">Toggle readonly</button>
</form>
```

Putting an ezFormReadonly directive on any parent element will place all child controls of the element into read only mode if a value of true is passed in as an input on the directive.

## Table

Add the EzTableModule to your module and you are ready to build Easy Tables.

[Testbed on StackBlitz](https://stackblitz.com/edit/angular-npn1p1?file=src%2Fapp%2Fapp.module.ts)

```html
<ez-table [data]="tableData" pageSize="5">
  <ez-table-search></ez-table-search>
  <ez-column heading="Full Name" property="firstName">
    <ng-template let-item>
      {{item.firstName}} {{item.lastName}}
    </ng-template>
  </ez-column>
  <ez-column heading="Full Name" [display]="fullName"></ez-column>
  <ez-column heading="Last Name" property="lastName"></ez-column>
  <ez-table-pager footer></ez-table-pager>
</ez-table>
```

```javascript
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tableData = [
    { firstName: 'Harry', lastName: 'Jones' },
    { firstName: 'Billy', lastName: 'Bob' },
    { firstName: 'Joe', lastName: 'Jones' },
    { firstName: 'Mary', lastName: 'Joe' },
    { firstName: 'Sue', lastName: 'Harris' },
    { firstName: 'Bob', lastName: 'Walker' },
    { firstName: 'Hillary', lastName: 'Smith' },
  ];

  fullName = (item) => `${item.firstName} ${item.lastName}`;
}
```

data is a plain JavaScript array and columns are defined with the ez-column component.

A column can display a property from the current data item with the property attribute, it can transform the current data item with a display function passed to the display attribute or it can use a custom template defined in it's content.

A search can be added with the ez-table-search and a pager can be added with the ez-table-pager component.

An element with the footer attribute will display in the tables footer.
