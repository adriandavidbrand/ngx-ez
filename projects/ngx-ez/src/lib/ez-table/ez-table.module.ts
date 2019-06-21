import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EzTableComponent } from './components/ez-table/ez-table.component';
import { EzTablePagerComponent } from './components/ez-table-pager/ez-table-pager.component';
import { EzTableSearchComponent } from './components/ez-table-search/ez-table-search.component';
import { EzColumnComponent } from './components/ez-column/ez-column.component';
import { EzHeadingComponent } from './components/ez-heading/ez-heading.component';

@NgModule({
  declarations: [
    EzTableComponent,
    EzTablePagerComponent,
    EzTableSearchComponent,
    EzColumnComponent,
    EzHeadingComponent
  ],
  imports: [CommonModule],
  exports: [EzTableComponent, EzTablePagerComponent, EzTableSearchComponent, EzColumnComponent, EzHeadingComponent]
})
export class EzTableModule {}
