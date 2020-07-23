import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClonePipe } from './clone.pipe';

@NgModule({
  declarations: [ClonePipe],
  imports: [CommonModule],
  exports: [ClonePipe],
})
export class ClonePipeModule {}
