import { Pipe, PipeTransform } from '@angular/core';

import { clone } from 'ez-functions';

@Pipe({
  name: 'clone',
})
export class ClonePipe implements PipeTransform {
  transform(value: any): any {
    return clone(value);
  }
}
