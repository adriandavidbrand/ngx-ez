import { Component, OnInit, Input, Optional } from '@angular/core';

import { EzControlBase } from '../ez-control-base';

@Component({
  selector: 'ez-control',
  templateUrl: './ez-control.component.html',
  styleUrls: ['./ez-control.component.css']
})
export class EzControlComponent {
  @Input()
  fieldset: boolean | string = false;

  private ezForm = this.ezControl.ezForm;

  get name(): string {
    return this.ezControl.name;
  }

  get readonly(): boolean {
    return this.ezControl.readonly;
  }

  get showRequired(): boolean {
    return this.ezForm && this.ezForm.readonly
      ? false
      : this.ezControl.required !== undefined &&
          this.ezControl.required !== false;
  }

  get valid(): boolean {
    return this.ezControl.valid;
  }

  get invalid(): boolean {
    return this.ezControl.invalid;
  }

  get message(): string {
    return this.ezControl.message;
  }

  get controlClasses(): string | string[] {
    return this.ezControl.controlClasses;
  }

  get labelClasses(): string | string[] {
    return this.ezControl.labelClasses;
  }

  get controlsClasses(): string | string[] {
    return this.ezControl.controlsClasses;
  }

  get readonlyClasses(): string | string[] {
    return this.ezControl.readonlyClasses;
  }

  get validationClasses(): string | string[] {
    return this.ezControl.validationClasses;
  }

  constructor(private ezControl: EzControlBase) {}
}
