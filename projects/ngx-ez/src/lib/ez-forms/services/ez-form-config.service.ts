import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EzFormConfigService {
  defaultMessages = {
    invalid: 'Invalid response',
    required: 'Response required'
  };

  formClasses: string | string[];
  formSubmittedClasses: string | string[];
  controlClasses: string | string[];
  legendClasses: string | string[];
  labelContainerClasses: string | string[];
  labelClasses: string | string[];
  controlsContainerClasses: string | string[];
  checkboxLabelClasses: string | string[];
  radioLabelClasses: string | string[];
  sublabelClasses: string | string[];
  readonlyLabelClasses: string | string[];
  readonlyClasses: string | string[];
  requiredClasses: string | string[];
  validationClasses: string | string[];
  inputClasses: string | string[];
  checkboxClasses: string | string[];
  checkboxContainerClasses: string | string[];
  radioClasses: string | string[];
  radioContainerClasses: string | string[];
  selectClasses: string | string[];
}
