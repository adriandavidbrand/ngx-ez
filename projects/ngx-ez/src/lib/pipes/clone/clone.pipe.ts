import { Pipe, PipeTransform } from '@angular/core';

import { clone } from 'ez-functions';

@Pipe({
    name: 'clone',
    standalone: false
})
export class ClonePipe<T> implements PipeTransform {
  transform(value: T): T {
    return clone(value);
  }
}
