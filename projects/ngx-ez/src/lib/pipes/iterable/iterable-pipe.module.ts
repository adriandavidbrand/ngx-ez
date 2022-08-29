import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IterablePipe } from './iterable.pipe';

@NgModule({
  declarations: [IterablePipe],
  exports: [IterablePipe],
  imports: [CommonModule],
})
export class IterablePipeModule {}
