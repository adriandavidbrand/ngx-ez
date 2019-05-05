import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencePipe } from './pipes/reference.pipe';

@NgModule({
  declarations: [ReferencePipe],
  imports: [CommonModule],
  exports: [ReferencePipe]
})
export class EzCoreModule {}
