import { Observable, BehaviorSubject, Subscription, SubscriptionLike, combineLatest, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

export class PushStack<T> extends Observable<T> implements SubscriptionLike {
  private behaviorSubject$ = new BehaviorSubject(this.value);

  private observable$ = this.parent$ ?
    combineLatest(this.behaviorSubject$, this.parent$).pipe(
      map(([behaviorSubject, parent]) => behaviorSubject || parent || this.defaultValue)
    ) :
      this.behaviorSubject$.pipe(map(behaviorSubject => behaviorSubject || this.defaultValue));

  get closed(): boolean {
    return this.behaviorSubject$.closed;
  }

  constructor(private value: T, private defaultValue: T, private parent$?: Observable<T>) {
    super();
  }

  complete() {
    this.behaviorSubject$.complete();
  }

  unsubscribe() {
    this.behaviorSubject$.unsubscribe();
  }

  _subscribe(subscriber: Subscriber<T>): Subscription {
    return this.observable$.subscribe(subscriber);
  }

  next(value: T): void {
    this.behaviorSubject$.next(value);
  }
}
