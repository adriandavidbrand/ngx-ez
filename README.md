# Ezng

Easy Angular is a collection of components to help build Angular apps in a template driven style.

## Usage

npm install --save ngx-ez

## Forms

Add the EzFormsModule to your module and you are ready to build so Easy Forms.

[Testbed on StackBlitz](https://stackblitz.com/edit/angular-8brst8?file=src%2Fapp%2Fapp.component.html)

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EzFormsModule } from 'ngx-ez';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, EzFormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

On a form you add the ez-form directive and an (ezSubmit) event handler that will only fire if the form is valid.

```html
<form ez-form (ezSubmit)="onSubmit()" [readonly]="readonly">
</form>
```

Now you can add form controls with the directives ez-text, ez-select, ez-radio, ez-checkbox and ez-checkboxes.

```html
<form ez-form (ezSubmit)="onSubmit()" [readonly]="readonly">
  <ez-text name="text" [(ngModel)]="model.text" required range="4-6">
    Text
  </ez-text>

  <ez-yes-no name="yesno" [(ngModel)]="model.yesno" required>
    Yes/No
  </ez-yes-no>

  <ez-select name="select" [(ngModel)]="model.select" [options]="[{ value: 1, label: 'Select 1' }, { value: 2, label: 'Select 2' }]" required>
    Select
  </ez-select>

  <ez-radio name="radio" [(ngModel)]="model.radio" [options]="[{ value: 1, label: 'Radio 1' }, { value: 2, label: 'Radio 2' }]" required>
    Radio
  </ez-radio>

  <ez-checkbox name="checkbox" [(ngModel)]="model.checkbox">
    Checkbox
  </ez-checkbox>

  <ez-checkboxes name="checkboxes" [(ngModel)]="model.checkboxes" [options]="[{ property: 'prop1', label: 'Checkbox 1' }, { property: 'prop2', label: 'Checkbox 2' }, { property: 'prop3', label: 'Checkbox 3' }]" checkboxes-required [messages]="{ required: 'Please select at least one option' }">
    Checkboxes
  </ez-checkboxes>

  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
  <button type="button" (click)="readonly = !readonly">Toggle readonly</button>
</form>
```

Putting a readonly attribute on the form will place all controls on the form into read only mode.

