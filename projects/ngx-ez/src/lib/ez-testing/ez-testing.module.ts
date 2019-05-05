import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EzFormConfigService } from '../ez-forms/services/ez-form-config.service';
import { EzControlComponent } from '../ez-forms/components/ez-control/ez-control.component';
import { ReferencePipe } from '../ez-core/pipes/reference.pipe';

@NgModule({
  declarations: [
    EzControlComponent, ReferencePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    EzFormConfigService
  ],
  exports: [
    EzControlComponent, ReferencePipe
  ]
})
export class EzTestingModule { }
