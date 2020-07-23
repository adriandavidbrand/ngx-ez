import { Pipe, PipeTransform } from '@angular/core';

import { clone } from '../../functions/clone';

@Pipe({
  name: 'clone',
})
export class ClonePipe implements PipeTransform {
  transform(value: any): any {
    return clone(value);
  }
}
