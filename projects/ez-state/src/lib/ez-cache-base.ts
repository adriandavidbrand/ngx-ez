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
    poll?: Subscription;
  } = {};

  protected observables: {
    state$?: Observable<EzState<T>>;
    value$?: Observable<T>;
    loading$?: Observable<boolean>;
    loaded$?: Observable<boolean>;
    loadError$?: Observable<any>;
    saving$?: Observable<boolean>;
    saved$?: Observable<boolean>;
    saveError$?: Observable<any>;
    updating$?: Observable<boolean>;
    updated$?: Observable<boolean>;
    updateError$?: Observable<any>;
    savingOrUpdating$?: Observable<boolean>;
    savedOrUpdated$?: Observable<boolean>;
    deleting$?: Observable<boolean>;
    deleted$?: Observable<boolean>;
    deleteError$?: Observable<any>;
    error$?: Observable<any>;
  } = {};

  constructor(value: T, protected errorHandler?: (error?: any, action?: EzStateAction) => any) {
    this.cache$ = new BehaviorSubject({ value: value });
  }

  get state$(): Observable<EzState<T>> {
    return this.observables.state$ ?? (this.observables.state$ = this.cache$.asObservable());
  }

  get snapshot(): EzState<T> {
    return this.cache$.value;
  }

  get value$(): Observable<T> {
    return (
      this.observables.value$ ??
      (this.observables.value$ = this.cache$.pipe(
        map((state) => state.value),
        distinctUntilChanged()
      ))
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
    return (
      this.observables.loaded$ ??
      (this.observables.loaded$ = this.cache$.pipe(
        map((state) => state.loaded || false),
        distinctUntilChanged()
      ))
    );
  }

  get loadError$(): Observable<any> {
    return (
      this.observables.loadError$ ??
      (this.observables.loadError$ = this.cache$.pipe(
        map((state) => state.loadError),
        distinctUntilChanged()
      ))
    );
  }

  get saving$(): Observable<boolean> {
    return (
      this.observables.saving$ ??
      (this.observables.saving$ = this.cache$.pipe(
        map((state) => state.saving || false),
        distinctUntilChanged()
      ))
    );
  }

  get saved$(): Observable<boolean> {
    return (
      this.observables.saved$ ??
      (this.observables.saved$ = this.cache$.pipe(
        map((state) => state.saved || false),
        distinctUntilChanged()
      ))
    );
  }

  get saveError$(): Observable<any> {
    return (
      this.observables.saveError$ ??
      (this.observables.saveError$ = this.cache$.pipe(
        map((state) => state.saveError),
        distinctUntilChanged()
      ))
    );
  }

  get updating$(): Observable<boolean> {
    return (
      this.observables.updated$ ??
      (this.observables.updated$ = this.cache$.pipe(
        map((state) => state.updating || false),
        distinctUntilChanged()
      ))
    );
  }

  get updated$(): Observable<boolean> {
    return (
      this.observables.updated$ ??
      (this.observables.updated$ = this.cache$.pipe(
        map((state) => state.updated || false),
        distinctUntilChanged()
      ))
    );
  }

  get updateError$(): Observable<any> {
    return (
      this.observables.updateError$ ??
      (this.observables.updateError$ = this.cache$.pipe(
        map((state) => state.updateError),
        distinctUntilChanged()
      ))
    );
  }

  get savingOrUpdating$(): Observable<boolean> {
    return (
      this.observables.savingOrUpdating$ ??
      (this.observables.savingOrUpdating$ = this.cache$.pipe(
        map((state) => state.saving || state.updating || false),
        distinctUntilChanged()
      ))
    );
  }

  get savedOrUpdated$(): Observable<boolean> {
    return (
      this.observables.savedOrUpdated$ ??
      (this.observables.savedOrUpdated$ = this.cache$.pipe(
        map((state) => state.saved || state.updated || false),
        distinctUntilChanged()
      ))
    );
  }

  get deleting$(): Observable<boolean> {
    return (
      this.observables.deleting$ ??
      (this.observables.deleting$ = this.cache$.pipe(
        map((state) => state.deleting || false),
        distinctUntilChanged()
      ))
    );
  }

  get deleted$(): Observable<boolean> {
    return (
      this.observables.deleted$ ??
      (this.observables.deleted$ = this.cache$.pipe(
        map((state) => state.deleted || false),
        distinctUntilChanged()
      ))
    );
  }

  get deleteError$(): Observable<any> {
    return (
      this.observables.deleteError$ ??
      (this.observables.deleteError$ = this.cache$.pipe(
        map((state) => state.deleteError),
        distinctUntilChanged()
      ))
    );
  }

  get error$(): Observable<any> {
    return (
      this.observables.error$ ??
      (this.observables.error$ = this.cache$.pipe(
        map((state) => state.loadError || state.saveError || state.updateError || state.deleteError),
        distinctUntilChanged()
      ))
    );
  }

  next(value: T): void {
    this.unsubscribe();
    this.cache$.next({ value });
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
    this.subscriptions.load = load$.subscribe({
      next: (value) => {
        this.cache$.next({ value, loaded: true });
      },
      error: (error) => {
        this.cache$.next({
          value: this.value,
          loadError: this.generateError(error, EzStateAction.load),
        });
      },
    });
  }

  poll(poll$: Observable<Observable<T>>): void {
    this.unsubscribe(EzStateAction.poll);
    this.subscriptions.poll = poll$.subscribe({
      next: (load$) => {
        this.load(load$);
      },
      error: (error) => {
        this.cache$.next({
          value: this.value,
          pollError: this.generateError(error, EzStateAction.poll),
        });
      },
    });
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
      this.unsubscribe(EzStateAction.poll);
    }
  }

  protected generateError(error: any, action: EzStateAction): any {
    return this.errorHandler?.(error, action) ?? error;
  }
}
