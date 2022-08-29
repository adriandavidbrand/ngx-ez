import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EzTableConfigService {
  messages = {
    noData: 'No records available',
  };

  tableClasses: string | string[] = '';
  headingRowClasses: string | string[] = '';
  footerRowClasses: string | string[] = '';
  rowClasses: string | string[] = '';
  pageSizeClasses: string | string[] = '';
  pageSizeSelectClasses: string | string[] = '';
}
