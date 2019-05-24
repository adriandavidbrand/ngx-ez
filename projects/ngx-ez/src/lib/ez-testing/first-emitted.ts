import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export async function firstEmitted<T>(obs$: Observable<T>): Promise<T> {
    return new Promise<T>(resolve => {
        const finalise = new Subject<void>();
        obs$.pipe(takeUntil(finalise)).subscribe(value => {
            finalise.next();
            resolve(value);
        });
    });
}
