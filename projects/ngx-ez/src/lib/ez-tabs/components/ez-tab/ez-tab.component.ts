import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { randomString } from 'ez-functions';

@Component({
  selector: 'ez-tab',
  templateUrl: './ez-tab.component.html',
  styleUrls: ['./ez-tab.component.scss'],
})
export class EzTabComponent implements OnInit {
  @Input()
  heading!: string;

  @Input()
  name!: string;

  @Input()
  route?: string;

  @Input()
  disabled = false;

  @Output()
  tabSelected = new EventEmitter();

  @ViewChild(TemplateRef)
  template?: TemplateRef<any>;

  ngOnInit() {
    if (!this.name) {
      this.name = randomString(16);
    }
  }
}
