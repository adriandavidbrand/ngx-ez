import { Observable } from 'rxjs';

import { EzStateAction } from './ez-state-action';
import { EzCacheBase } from './ez-cache-base';

export class EzCache<T> extends EzCacheBase<T> {
  constructor(value: T, errorHandler?: (error?: any, action?: EzStateAction) => any) {
    super(value, errorHandler);
  }

  save(save$: Observable<T>): void;
  save(save$: Observable<any>, ignoreResponse: true): void;
  save(save$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.save);
    this.cache$.next({ value: this.value, saving: true });
    this.subscriptions.save = save$.subscribe({
      next: (value) => {
        this.cache$.next({
          value: ignoreResponse ? this.value : value,
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
          value: ignoreResponse ? this.value : value,
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
    this.update(update$, true);
  }

  delete(delete$: Observable<T>): void;
  delete(delete$: Observable<any>, ignoreResponse: true): void;
  delete(delete$: Observable<any>, ignoreResponse = false): void {
    this.unsubscribe(EzStateAction.delete);
    this.cache$.next({ value: this.value, deleting: true });
    this.subscriptions.delete = delete$.subscribe({
      next: (value) => {
        this.cache$.next({
          value: ignoreResponse ? this.value : value,
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
    this.delete(delete$, true);
  }
}
