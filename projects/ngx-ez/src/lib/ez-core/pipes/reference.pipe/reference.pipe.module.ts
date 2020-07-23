import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencePipe } from './reference.pipe';

@NgModule({
  declarations: [ReferencePipe],
  imports: [CommonModule],
  exports: [ReferencePipe],
})
export class ReferencePipeModule {}
