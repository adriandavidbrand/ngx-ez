import { TemplateRef } from '@angular/core';

export interface EzFormConfig {
  defaultMessages: { [key: string]: string };

  fieldsetTemplate: TemplateRef<any> | null;
  labelTemplate: TemplateRef<any> | null;
  readonlyTemplate: TemplateRef<any> | null;

  requiredIndicator: boolean;
  pristineMessages: boolean;

  checkboxClasses: string | string[];
  checkboxContainerClasses: string | string[];
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
  radioClasses: string | string[];
  radioContainerClasses: string | string[];
  selectClasses: string | string[];
  fieldsetLabelClasses: string | string[];
}
