import { Observable } from 'rxjs';

import { EzStateAction } from './ez-state-action';
import { EzCacheBase } from './ez-cache-base';

export class EzCache<T> extends EzCacheBase<T> {
  constructor(
    valueOrErrorHandler?: T | ((error?: any, action?: EzStateAction) => any),
    errorHandler?: (error?: any, action?: EzStateAction) => any
  ) {
    super(valueOrErrorHandler, errorHandler);
  }

  save(save$: Observable<T>): void;
  save(save$: Observable<any>, ignoreResponse: true): void;
  save(save$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.save);
    this.cache$.next({ value: this.value, saving: true });
    this.subscriptions.save = save$.subscribe(
      (value) => {
        this.cache$.next({ value: ignoreResponse ? this.value : value, saved: true });
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
    this.subscriptions.update = update$.subscribe(
      (value) => {
        this.cache$.next({ value: ignoreResponse ? this.value : value, updated: true });
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
    this.subscriptions.delete = delete$.subscribe(
      (value) => {
        this.cache$.next({ value: ignoreResponse ? this.value : value, deleted: true });
      },
      (error) => {
        this.cache$.next({ value: this.value, deleteError: this.generateError(error, EzStateAction.delete) });
      }
    );
  }
}
