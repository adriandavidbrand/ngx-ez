import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../../ez-forms/models/option';

@Pipe({
  name: 'reference',
})
export class ReferencePipe<T> implements PipeTransform {
  transform(value: T, options: Option<T>[]): string | undefined {
    return options?.find((o) => o.value === value)?.label;
  }
}
