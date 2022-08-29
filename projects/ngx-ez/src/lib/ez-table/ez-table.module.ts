import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EzColumnComponent } from './components/ez-column/ez-column.component';
import { EzFooterComponent } from './components/ez-footer/ez-footer.component';
import { EzHeadingComponent } from './components/ez-heading/ez-heading.component';
import { EzTableComponent } from './components/ez-table/ez-table.component';
import { EzTablePagerComponent } from './components/ez-table-pager/ez-table-pager.component';
import { EzTableSearchComponent } from './components/ez-table-search/ez-table-search.component';
import { IterablePipeModule } from '../pipes/iterable/iterable-pipe.module';

@NgModule({
  declarations: [
    EzColumnComponent,
    EzFooterComponent,
    EzHeadingComponent,
    EzTableComponent,
    EzTablePagerComponent,
    EzTableSearchComponent,
  ],
  imports: [CommonModule, IterablePipeModule],
  exports: [
    EzColumnComponent,
    EzFooterComponent,
    EzHeadingComponent,
    EzTableComponent,
    EzTablePagerComponent,
    EzTableSearchComponent,
  ],
})
export class EzTableModule {}
