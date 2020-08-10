import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { resolveProperty } from 'ngx-ez';
import { EzStateAction } from './ez-state-action';
import { EzCacheBase } from './ez-cache-base';

export class EzArrayCache<T, P> extends EzCacheBase<T[]> {
  private id$ = new BehaviorSubject<P>(undefined);

  items$ = this.value$;

  item$ = combineLatest([this.id$, this.value$]).pipe(
    map(([id, value]) =>
      id && value ? value.find((item) => id === resolveProperty(item, this.idProperty)) : this.defaultObj
    )
  );

  constructor(
    private idProperty: string,
    private defaultObj?: T,
    valueOrErrorHandler?: T[] | ((error?: any, action?: EzStateAction) => any),
    errorHandler?: (error?: any, action?: EzStateAction) => any
  ) {
    super(valueOrErrorHandler, errorHandler);
  }

  select(id: P): void {
    this.id$.next(id);
  }

  save(save$: Observable<T>): void;
  save(save$: Observable<any>, ignoreResponse: true): void;
  save(save$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.save);
    this.cache$.next({ value: this.value, saving: true });
    this.subscriptions.save = save$.subscribe(
      (value) => {
        this.cache$.next({ value: ignoreResponse ? this.value : [...this.value, value], saved: true });
      },
      (error) => {
        this.cache$.next({ value: this.value, saveError: this.generateError(error, EzStateAction.save) });
      }
    );
  }

  update(update$: Observable<T>): void;
  update(update$: Observable<any>, ignoreResponse: true): void;
  update(update$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.update);
    this.cache$.next({ value: this.value, updating: true });
    this.subscriptions.save = update$.subscribe(
      (value) => {
        this.cache$.next({
          value: ignoreResponse
            ? this.value
            : this.value.map((item) =>
                resolveProperty(item, this.idProperty) === resolveProperty(value, this.idProperty) ? value : item
              ),
          updated: true,
        });
      },
      (error) => {
        this.cache$.next({ value: this.value, updateError: this.generateError(error, EzStateAction.update) });
      }
    );
  }

  delete(delete$: Observable<T>): void;
  delete(delete$: Observable<any>, ignoreResponse: true): void;
  delete(delete$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.delete);
    this.cache$.next({ value: this.value, deleting: true });
    this.subscriptions.save = delete$.subscribe(
      (value) => {
        this.cache$.next({
          value: ignoreResponse
            ? this.value
            : this.value.filter(
                (item) => resolveProperty(item, this.idProperty) !== resolveProperty(value, this.idProperty)
              ),
          deleted: true,
        });
      },
      (error) => {
        this.cache$.next({ value: this.value, deleteError: this.generateError(error, EzStateAction.delete) });
      }
    );
  }
}
