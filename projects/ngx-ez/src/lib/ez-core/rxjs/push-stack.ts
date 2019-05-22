import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export class PushStack<T> extends Observable<T> {
  private behaviorSubject$ = new BehaviorSubject(this.value);

  constructor(private value: T, private defaultValue: T, private parent$?: Observable<T>) {
    super();
    this.source = this.parent$ ?
      combineLatest(this.behaviorSubject$, this.parent$).pipe(
        map(([behaviorSubject, parent]) => behaviorSubject || parent || this.defaultValue)
      ) : this.behaviorSubject$.pipe(map(behaviorSubject => behaviorSubject || this.defaultValue));
  }

  complete() {
    this.behaviorSubject$.complete();
  }

  unsubscribe() {
    this.behaviorSubject$.unsubscribe();
  }

  next(value: T): void {
    this.behaviorSubject$.next(value);
  }
}
