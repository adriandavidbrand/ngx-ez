import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferencePipe } from './reference.pipe';

@NgModule({
  declarations: [ReferencePipe],
  exports: [ReferencePipe],
  imports: [CommonModule],
})
export class ReferencePipeModule {}
