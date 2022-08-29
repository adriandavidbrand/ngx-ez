import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolveProperty } from 'ez-functions';

import { EzStateAction } from './ez-state-action';
import { EzCacheBase } from './ez-cache-base';

export class EzArrayCache<T> extends EzCacheBase<T[]> {
  private id$ = new BehaviorSubject<any>(undefined);

  items$ = this.value$;

  item$ = combineLatest([this.id$, this.value$]).pipe(
    map(([id, value]) =>
      id && value ? value.find((item) => id === resolveProperty(item, this.idProperty)) : this.defaultObj
    )
  );

  constructor(
    private idProperty: string,
    private defaultObj?: T,
    value: T[] = [],
    errorHandler?: (error?: any, action?: EzStateAction) => any
  ) {
    super(value, errorHandler);
  }

  select(id: any): void {
    this.id$.next(id);
  }

  save(save$: Observable<T>): void;
  save(save$: Observable<any>, ignoreResponse: true): void;
  save(save$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.save);
    this.cache$.next({ value: this.value, saving: true });
    this.subscriptions.save = save$.subscribe({
      next: (value) => {
        this.cache$.next({
          value: ignoreResponse ? this.value : [...this.value, value],
          saved: true,
        });
      },
      error: (error) => {
        this.cache$.next({
          value: this.value,
          saveError: this.generateError(error, EzStateAction.save),
        });
      },
    });
  }

  saveIgnoreResponse(save$: Observable<any>): void {
    this.save(save$, true);
  }

  update(update$: Observable<T>): void;
  update(update$: Observable<any>, ignoreResponse: true): void;
  update(update$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.update);
    this.cache$.next({ value: this.value, updating: true });
    this.subscriptions.update = update$.subscribe({
      next: (value) => {
        this.cache$.next({
          value: ignoreResponse
            ? this.value
            : this.value.map((item) =>
                resolveProperty(item, this.idProperty) === resolveProperty(value, this.idProperty) ? value : item
              ),
          updated: true,
        });
      },
      error: (error) => {
        this.cache$.next({
          value: this.value,
          updateError: this.generateError(error, EzStateAction.update),
        });
      },
    });
  }

  updateIgnoreResponse(update$: Observable<any>): void {
    this.save(update$, true);
  }

  updateBulk(update$: Observable<T[]>): void {
    this.unsubscribe(EzStateAction.update);
    this.cache$.next({ value: this.value, updating: true });
    this.subscriptions.update = update$.subscribe({
      next: (values) => {
        const existingIds = this.value?.map((value) => resolveProperty(value, this.idProperty)) || [];
        const newValues =
          values?.filter((value) => !existingIds.includes(resolveProperty(value, this.idProperty))) || [];
        this.cache$.next({
          value: [
            ...(this.value?.map(
              (item) =>
                values.find((i) => resolveProperty(item, this.idProperty) === resolveProperty(i, this.idProperty)) ||
                item
            ) || []),
            ...newValues,
          ],
          updated: true,
        });
      },
      error: (error) => {
        this.cache$.next({
          value: this.value,
          updateError: this.generateError(error, EzStateAction.update),
        });
      },
    });
  }

  delete(delete$: Observable<T>): void;
  delete(delete$: Observable<any>, ignoreResponse: true): void;
  delete(delete$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.delete);
    this.cache$.next({ value: this.value, deleting: true });
    this.subscriptions.delete = delete$.subscribe({
      next: (value) => {
        this.cache$.next({
          value: ignoreResponse
            ? this.value
            : this.value.filter(
                (item) => resolveProperty(item, this.idProperty) !== resolveProperty(value, this.idProperty)
              ),
          deleted: true,
        });
      },
      error: (error) => {
        this.cache$.next({
          value: this.value,
          deleteError: this.generateError(error, EzStateAction.delete),
        });
      },
    });
  }

  deleteIgnoreResponse(delete$: Observable<any>): void {
    this.save(delete$, true);
  }
}
