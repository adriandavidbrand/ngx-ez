import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export function firstTruthy<T>(...observables: Observable<T>[]): Observable<T> {
    const instances = observables ? observables.filter(obs => obs) : observables;
    return instances ?
        instances.length === 1 ?
            instances[0] : instances.length > 1 ?
                combineLatest(instances).pipe(map(vals => vals.find(val => !!val))) : undefined : undefined;
}
