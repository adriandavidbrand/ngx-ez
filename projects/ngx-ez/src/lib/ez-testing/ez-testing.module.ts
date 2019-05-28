import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EzFormConfigService } from '../ez-forms/services/ez-form-config.service';
import { EzControlComponent } from '../ez-forms/components/ez-control/ez-control.component';
import { ReferencePipe } from '../ez-core/pipes/reference.pipe';
import { ValidDirective } from '../ez-forms/directives/valid.directive';

@NgModule({
  declarations: [EzControlComponent, ReferencePipe, ValidDirective],
  imports: [CommonModule],
  providers: [EzFormConfigService],
  exports: [EzControlComponent, ReferencePipe, ValidDirective]
})
export class EzTestingModule {}
