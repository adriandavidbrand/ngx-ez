import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterable',
})
export class IterablePipe implements PipeTransform {
  // This pipe can be used when you want to repeat something in a template n times
  // Saves having to create an array just for template binding
  // *ngFor="let row of numberOfRows | iterable"
  transform(value: number): Iterable<number> {
    const iterable = <Iterable<number>>{};
    iterable[Symbol.iterator] = function* () {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }
}
