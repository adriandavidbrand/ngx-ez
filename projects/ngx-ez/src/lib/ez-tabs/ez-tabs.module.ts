import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzTabComponent } from './components/ez-tab/ez-tab.component';
import { EzTabsComponent } from './components/ez-tabs/ez-tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EzTabComponent, EzTabsComponent],
  exports: [EzTabComponent, EzTabsComponent],
  imports: [CommonModule, RouterModule],
})
export class EzTabsModule {}
