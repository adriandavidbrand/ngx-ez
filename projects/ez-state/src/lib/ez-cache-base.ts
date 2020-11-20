import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { EzState } from './ez-state';
import { EzStateAction } from './ez-state-action';

export class EzCacheBase<T> {
  protected cache$: BehaviorSubject<EzState<T>>;

  protected subscriptions: {
    load?: Subscription;
    save?: Subscription;
    update?: Subscription;
    delete?: Subscription;
  } = {};

  protected errorHandler: (error?: any, action?: EzStateAction) => any;


  static generalErrorHandler(error: any, action: EzStateAction): any {
    return error;
  }

  constructor(
    valueOrErrorHandler?: T | ((error?: any, action?: EzStateAction) => any),
    errorHandler?: (error?: any, action?: EzStateAction) => any
  ) {
    if (typeof valueOrErrorHandler === 'function') {
      this.errorHandler = valueOrErrorHandler as (error?: any, action?: EzStateAction) => any;
      this.cache$ = new BehaviorSubject({ value: undefined });
    } else {
      this.cache$ = new BehaviorSubject({ value: valueOrErrorHandler });
      this.errorHandler = errorHandler;
    }
  }

  get state$(): Observable<EzState<T>> {
    return this.cache$.asObservable();
  }

  get snapshot(): EzState<T> {
    return this.cache$.value;
  }

  get value$(): Observable<T> {
    return this.cache$.pipe(
      map((state) => state.value),
      distinctUntilChanged()
    );
  }

  get value(): T {
    return this.cache$.value.value;
  }

  get loading$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.loading || false),
      distinctUntilChanged()
    );
  }

  get loaded$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.loaded || false),
      distinctUntilChanged()
    );
  }

  get loadError$(): Observable<any> {
    return this.cache$.pipe(
      map((state) => state.loadError),
      distinctUntilChanged()
    );
  }

  get saving$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.saving || false),
      distinctUntilChanged()
    );
  }

  get saved$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.saved || false),
      distinctUntilChanged()
    );
  }

  get saveError$(): Observable<any> {
    return this.cache$.pipe(
      map((state) => state.saveError),
      distinctUntilChanged()
    );
  }

  get updating$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.updating || false),
      distinctUntilChanged()
    );
  }

  get updated$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.updated || false),
      distinctUntilChanged()
    );
  }

  get updateError$(): Observable<any> {
    return this.cache$.pipe(
      map((state) => state.updateError),
      distinctUntilChanged()
    );
  }

  get savingOrUpdating$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.saving || state.updating || false),
      distinctUntilChanged()
    );
  }

  get savedOrUpdated$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.saved || state.updated || false),
      distinctUntilChanged()
    );
  }

  get deleting$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.deleting || false),
      distinctUntilChanged()
    );
  }

  get deleted$(): Observable<boolean> {
    return this.cache$.pipe(
      map((state) => state.deleted || false),
      distinctUntilChanged()
    );
  }

  get deleteError$(): Observable<any> {
    return this.cache$.pipe(
      map((state) => state.deleteError),
      distinctUntilChanged()
    );
  }

  get error$(): Observable<any> {
    return this.cache$.pipe(
      map((state) => state.loadError || state.saveError || state.updateError || state.deleteError),
      distinctUntilChanged()
    );
  }

  next(value: T): void {
    this.unsubscribe();
    this.cache$.next({ value });
  }

  reset(): void {
    this.unsubscribe();
    this.cache$.next({ value: undefined });
  }

  setState(state?: Partial<EzState<T>>): void {
    this.unsubscribe();
    this.cache$.next({ value: this.value, ...state });
  }

  complete(): void {
    this.unsubscribe();
    this.cache$.complete();
  }

  load(load$: Observable<T>): void {
    this.unsubscribe(EzStateAction.load);
    this.cache$.next({ value: this.value, loading: true });
    this.subscriptions.load = load$.subscribe(
      (value) => {
        this.cache$.next({ value, loaded: true });
      },
      (error) => {
        this.cache$.next({ value: this.value, loadError: this.generateError(error, EzStateAction.load) });
      }
    );
  }

  unsubscribe(action?: EzStateAction): void {
    if (action) {
      const subscription = this.subscriptions[action];
      if (subscription) {
        subscription.unsubscribe();
        delete this.subscriptions[action];
      }
    } else {
      this.unsubscribe(EzStateAction.load);
      this.unsubscribe(EzStateAction.save);
      this.unsubscribe(EzStateAction.update);
      this.unsubscribe(EzStateAction.delete);
    }
  }

  protected generateError(error: any, action: EzStateAction): any {
    return (this.errorHandler && this.errorHandler(error, action)) || EzCacheBase.generalErrorHandler(error, action);
  }
}
