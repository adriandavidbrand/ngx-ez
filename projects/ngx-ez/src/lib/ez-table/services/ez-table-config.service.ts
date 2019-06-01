import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EzTableConfigService {
  tableClasses: string | string[];
  headingRowClasses: string | string[];
  rowClasses: string | string[];
}
