import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EzTabComponent } from './components/ez-tab/ez-tab.component';
import { EzTabsComponent } from './components/ez-tabs/ez-tabs.component';

@NgModule({
  declarations: [EzTabComponent, EzTabsComponent],
  imports: [CommonModule, EzTabsComponent],
})
export class EzTabsModule {}
