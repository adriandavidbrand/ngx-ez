import { Injectable } from '@angular/core';

import { EzTableConfigService } from './ez-table-config.service';

@Injectable({
  providedIn: 'root',
})
export class EzTableBootstrapConfigService extends EzTableConfigService {
  constructor() {
    super();

    this.tableClasses = 'table';
    this.pageSizeClasses = 'form-group form-inline';
    this.pageSizeClasses = 'form-control form-control-sm m-1';
  }
}
