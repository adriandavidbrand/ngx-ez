import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EzTabComponent } from '../ez-tab/ez-tab.component';

@Component({
  selector: 'ez-tabs',
  templateUrl: './ez-tabs.component.html',
  styleUrls: ['./ez-tabs.component.scss'],
})
export class EzTabsComponent {
  selectedTab?: EzTabComponent;

  current?: string;
  @Input('current')
  set currentSet(name: string) {
    const tab = this.tabs?.find((tab) => tab.name === name);
    if (tab) {
      this.selectTab(tab);
    } else {
      this.current = name;
    }
  }

  @Output()
  currentChange = new EventEmitter<string>();

  @ContentChildren(EzTabComponent)
  tabs!: QueryList<EzTabComponent>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  selectTab(tab: EzTabComponent) {
    if (!tab.disabled && this.selectedTab !== tab) {
      if (!tab.route && this.selectedTab?.route) {
        this.router.navigate(['.'], { relativeTo: this.route });
      }
      this.selectedTab = tab;
      if (this.current !== tab.name) {
        this.current = tab.name;
        this.currentChange.emit(tab.name);
      }
      tab.tabSelected.emit();
    }
  }
}
