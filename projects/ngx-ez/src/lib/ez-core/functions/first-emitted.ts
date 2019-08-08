import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export async function firstEmitted<T>(obs$: Observable<T>): Promise<T> {
  return new Promise<T>(resolve => {
    obs$.pipe(take(1)).subscribe(value => {
      resolve(value);
    });
  });
}
