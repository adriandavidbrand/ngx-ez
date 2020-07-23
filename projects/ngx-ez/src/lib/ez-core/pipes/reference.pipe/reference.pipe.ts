import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reference'
})
export class ReferencePipe implements PipeTransform {
  transform(value: any, options: any[]): string {
    const option = options ? options.find(o => o.value === value) : null;
    return option ? option.label : null;
  }
}
