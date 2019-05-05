import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EzFormConfigService {
  defaultMessages = {
    invalid: 'Invalid response',
    required: 'Response required'
  };

  controlClasses: string | string[];
  labelClasses: string | string[];
  controlsClasses: string | string[];
  checkboxLabelClasses: string | string[];
  radioLabelClasses: string | string[];
  sublabelClasses: string | string[];
  readonlyClasses: string | string[];
  validationClasses: string | string[];
  inputClasses: string | string[];
  checkboxClasses: string | string[];
  radioClasses: string | string[];
  selectClasses: string | string[];
  groupClasses: string | string[];
}
