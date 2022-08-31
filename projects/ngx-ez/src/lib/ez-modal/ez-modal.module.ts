import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzModalComponent } from './components/ez-modal/ez-modal.component';

@NgModule({
  declarations: [EzModalComponent],
  exports: [EzModalComponent],
  imports: [CommonModule],
})
export class EzModalModule {}
