import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { EzCache } from './ez-cache';
import { EzState } from './ez-state';

describe('EzCache', () => {
  it('state$ should emit state', () => {
    const cache = new EzCache('value');
    let state: EzState<string> | undefined;
    const subscription = cache.state$.subscribe((v) => {
      state = v;
    });
    subscription.unsubscribe();
    expect(state?.value).toEqual('value');
  });

  it('snapshot should return state', () => {
    const cache = new EzCache('value');
    expect(cache.snapshot.value).toEqual('value');
  });

  it('value should be undefined', () => {
    const cache = new EzCache(undefined);
    expect(cache.value).toBeUndefined();
  });

  it('value should return constructed value', () => {
    const cache = new EzCache('value');
    expect(cache.value).toEqual('value');
  });

  it('value$ should return constructed value', () => {
    const cache = new EzCache('value');
    let value: string | undefined;
    const subscription = cache.value$.subscribe((v) => {
      value = v;
    });
    subscription.unsubscribe();
    expect(value).toEqual('value');
  });

  it('next should update value', () => {
    const cache = new EzCache('');
    cache.next('value');
    expect(cache.value).toEqual('value');
  });

  it('should run custom error handler as second constructor paramater', () => {
    const cache = new EzCache('', () => 'custom error');
    cache.load(throwError(() => 'custom error'));
    let error: string | undefined;
    const subscription = cache.loadError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('custom error');
  });

  it('should run custom error handler as first constructor paramater', () => {
    const cache = new EzCache(() => 'custom error');
    cache.load(throwError(() => 'custom error'));
    let error: string | undefined;
    const subscription = cache.loadError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('custom error');
  });

  it('setState should leave value', () => {
    const cache = new EzCache('value');
    cache.setState();
    expect(cache.snapshot.value).toEqual('value');
  });

  it('setState should set state', () => {
    const cache = new EzCache('value');
    cache.setState({ loading: true });
    expect(cache.snapshot.loading).toBeTrue();
  });

  it('complete should finalise', () => {
    const cache = new EzCache('');
    cache.load(of(''));
    cache.complete();
    let called = false;
    const subscription = cache.value$.subscribe((_) => {
      called = true;
    });
    subscription.unsubscribe();
    expect(called).toBeFalse();
  });
});

describe('EzCache load', () => {
  it('load should update value', () => {
    const cache = new EzCache('');
    cache.load(of('value'));
    expect(cache.value).toEqual('value');
  });

  it('load error should update loadError$', () => {
    const cache = new EzCache('');
    cache.load(throwError(() => 'load error'));
    let error: string | undefined;
    const subscription = cache.loadError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('load error');
  });

  it('setState should reset loadError$', () => {
    const cache = new EzCache(undefined);
    cache.load(throwError(() => 'load error'));
    cache.setState();
    let error: string | undefined;
    const subscription = cache.loadError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toBeUndefined();
  });

  it('load error should update error$', () => {
    const cache = new EzCache('');
    cache.load(throwError(() => 'load error'));
    let error: string | undefined;
    const subscription = cache.error$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('load error');
  });

  it('should be loading for 5ms', () => {
    const cache = new EzCache('');
    cache.load(of('value').pipe(delay(5)));
    let loading: boolean | undefined;
    const subscription = cache.loading$.subscribe((l) => {
      loading = l;
    });
    subscription.unsubscribe();
    expect(loading).toBeTrue();
  });

  it('should not be loading after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.load(of('value').pipe(delay(5)));
    let loading: boolean | undefined;
    const subscription = cache.loading$.subscribe((l) => {
      loading = l;
    });
    tick(6);
    subscription.unsubscribe();
    expect(loading).toBeFalse();
  }));

  it('should not be loaded for 5ms', () => {
    const cache = new EzCache('');
    cache.load(of('value').pipe(delay(5)));
    let loaded: boolean | undefined;
    const subscription = cache.loaded$.subscribe((l) => {
      loaded = l;
    });
    subscription.unsubscribe();
    expect(loaded).toBeFalse();
  });

  it('should be loaded after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.load(of('value').pipe(delay(5)));
    let loaded: boolean | undefined;
    const subscription = cache.loaded$.subscribe((l) => {
      loaded = l;
    });
    tick(6);
    subscription.unsubscribe();
    expect(loaded).toBeTrue();
  }));

  it('setState should reset loaded', () => {
    const cache = new EzCache('');
    cache.load(of('value'));
    cache.setState();
    let loaded: boolean | undefined;
    const subscription = cache.loaded$.subscribe((l) => {
      loaded = l;
    });
    subscription.unsubscribe();
    expect(loaded).toBeFalse();
  });
});

describe('EzCache save', () => {
  it('save should update value', () => {
    const cache = new EzCache('');
    cache.save(of('value'));
    expect(cache.value).toEqual('value');
  });

  it('save ignoreResponse should not update value', () => {
    const cache = new EzCache('value');
    cache.save(of('save response'), true);
    expect(cache.value).toEqual('value');
  });

  it('save error should update saveError$', () => {
    const cache = new EzCache('');
    cache.save(throwError(() => 'save error'));
    let error: string | undefined;
    const subscription = cache.saveError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('save error');
  });

  it('setState should reset saveError$', () => {
    const cache = new EzCache('');
    cache.save(throwError(() => 'save error'));
    cache.setState();
    let error: string | undefined;
    const subscription = cache.saveError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toBeUndefined();
  });

  it('save error should update error$', () => {
    const cache = new EzCache('');
    cache.save(throwError(() => 'save error'));
    let error: string | undefined;
    const subscription = cache.error$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('save error');
  });

  it('should be saving for 5ms', () => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let saving: boolean | undefined;
    const subscription = cache.saving$.subscribe((s) => {
      saving = s;
    });
    subscription.unsubscribe();
    expect(saving).toBeTrue();
  });

  it('should be savingOrUpdating for 5ms', () => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let savingOrUpdating: boolean | undefined;
    const subscription = cache.savingOrUpdating$.subscribe((s) => {
      savingOrUpdating = s;
    });
    subscription.unsubscribe();
    expect(savingOrUpdating).toBeTrue();
  });

  it('should not be saving after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let saving: boolean | undefined;
    const subscription = cache.saving$.subscribe((s) => {
      saving = s;
    });
    tick(6);
    subscription.unsubscribe();
    expect(saving).toBeFalse();
  }));

  it('should not be savingOrUpdating after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let savingOrUpdating: boolean | undefined;
    const subscription = cache.savingOrUpdating$.subscribe((s) => {
      savingOrUpdating = s;
    });
    tick(6);
    subscription.unsubscribe();
    expect(savingOrUpdating).toBeFalse();
  }));

  it('should not be saved for 5ms', () => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let saved: boolean | undefined;
    const subscription = cache.saved$.subscribe((s) => {
      saved = s;
    });
    subscription.unsubscribe();
    expect(saved).toBeFalse();
  });

  it('should not be savedOrUpdated for 5ms', () => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let savedOrUpdated: boolean | undefined;
    const subscription = cache.savedOrUpdated$.subscribe((s) => {
      savedOrUpdated = s;
    });
    subscription.unsubscribe();
    expect(savedOrUpdated).toBeFalse();
  });

  it('should be saved after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let saved: boolean | undefined;
    const subscription = cache.saved$.subscribe((s) => {
      saved = s;
    });
    tick(6);
    subscription.unsubscribe();
    expect(saved).toBeTrue();
  }));

  it('should be savedOrUpdated after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.save(of('value').pipe(delay(5)));
    let savedOrUpdated: boolean | undefined;
    const subscription = cache.savedOrUpdated$.subscribe((s) => {
      savedOrUpdated = s;
    });
    tick(6);
    subscription.unsubscribe();
    expect(savedOrUpdated).toBeTrue();
  }));

  it('setState should reset saved', () => {
    const cache = new EzCache('');
    cache.save(of('value'));
    cache.setState();
    let saved: boolean | undefined;
    const subscription = cache.saved$.subscribe((s) => {
      saved = s;
    });
    subscription.unsubscribe();
    expect(saved).toBeFalse();
  });
});

describe('EzCache update', () => {
  it('update should update value', () => {
    const cache = new EzCache('');
    cache.update(of('value'));
    expect(cache.value).toEqual('value');
  });

  it('update ignoreResponse should not update value', () => {
    const cache = new EzCache('value');
    cache.update(of('update response'), true);
    expect(cache.value).toEqual('value');
  });

  it('update error should update updateError$', () => {
    const cache = new EzCache('');
    cache.update(throwError(() => 'update error'));
    let error: string | undefined;
    const subscription = cache.updateError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('update error');
  });

  it('setState should reset updateError$', () => {
    const cache = new EzCache('');
    cache.update(throwError(() => 'update error'));
    cache.setState();
    let error: string | undefined;
    const subscription = cache.updateError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toBeUndefined();
  });

  it('update error should update error$', () => {
    const cache = new EzCache('');
    cache.update(throwError(() => 'update error'));
    let error: string | undefined;
    const subscription = cache.error$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('update error');
  });

  it('should be updating for 5ms', () => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let updating: boolean | undefined;
    const subscription = cache.updating$.subscribe((u) => {
      updating = u;
    });
    subscription.unsubscribe();
    expect(updating).toBeTrue();
  });

  it('should be savingOrUpdating for 5ms', () => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let savingOrUpdating: boolean | undefined;
    const subscription = cache.savingOrUpdating$.subscribe((u) => {
      savingOrUpdating = u;
    });
    subscription.unsubscribe();
    expect(savingOrUpdating).toBeTrue();
  });

  it('should not be updating after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let updating: boolean | undefined;
    const subscription = cache.updating$.subscribe((u) => {
      updating = u;
    });
    tick(6);
    subscription.unsubscribe();
    expect(updating).toBeFalse();
  }));

  it('should not be savingOrUpdating after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let savingOrUpdating: boolean | undefined;
    const subscription = cache.savingOrUpdating$.subscribe((u) => {
      savingOrUpdating = u;
    });
    tick(6);
    subscription.unsubscribe();
    expect(savingOrUpdating).toBeFalse();
  }));

  it('should not be updated for 5ms', () => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let updated: boolean | undefined;
    const subscription = cache.updated$.subscribe((u) => {
      updated = u;
    });
    subscription.unsubscribe();
    expect(updated).toBeFalse();
  });

  it('should not be savedOrUpdated for 5ms', () => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let savedOrUpdated: boolean | undefined;
    const subscription = cache.savedOrUpdated$.subscribe((u) => {
      savedOrUpdated = u;
    });
    subscription.unsubscribe();
    expect(savedOrUpdated).toBeFalse();
  });

  it('should be updated after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let updated: boolean | undefined;
    const subscription = cache.updated$.subscribe((u) => {
      updated = u;
    });
    tick(6);
    subscription.unsubscribe();
    expect(updated).toBeTrue();
  }));

  it('should be savedOrUpdated after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.update(of('value').pipe(delay(5)));
    let savedOrUpdated: boolean | undefined;
    const subscription = cache.savedOrUpdated$.subscribe((u) => {
      savedOrUpdated = u;
    });
    tick(6);
    subscription.unsubscribe();
    expect(savedOrUpdated).toBeTrue();
  }));

  it('setState should reset updated', () => {
    const cache = new EzCache('');
    cache.update(of('value'));
    cache.setState();
    let updated: boolean | undefined;
    const subscription = cache.updated$.subscribe((s) => {
      updated = s;
    });
    subscription.unsubscribe();
    expect(updated).toBeFalse();
  });
});

describe('EzCache delete', () => {
  it('delete should update value', () => {
    const cache = new EzCache('');
    cache.delete(of('value'));
    expect(cache.value).toEqual('value');
  });

  it('delete ignoreResponse should not update value', () => {
    const cache = new EzCache('value');
    cache.delete(of('delete response'), true);
    expect(cache.value).toEqual('value');
  });

  it('delete error should update deleteError$', () => {
    const cache = new EzCache('');
    cache.delete(throwError(() => 'delete error'));
    let error: string | undefined;
    const subscription = cache.deleteError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('delete error');
  });

  it('setState should reset deleteError$', () => {
    const cache = new EzCache('');
    cache.delete(throwError(() => 'delete error'));
    cache.setState();
    let error: string | undefined;
    const subscription = cache.deleteError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toBeUndefined();
  });

  it('delete error should update error$', () => {
    const cache = new EzCache('');
    cache.delete(throwError(() => 'delete error'));
    let error: string | undefined;
    const subscription = cache.error$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('delete error');
  });

  it('should be deleting for 5ms', () => {
    const cache = new EzCache('');
    cache.delete(of('value').pipe(delay(5)));
    let deleting: boolean | undefined;
    const subscription = cache.deleting$.subscribe((d) => {
      deleting = d;
    });
    subscription.unsubscribe();
    expect(deleting).toBeTrue();
  });

  it('should not be deleting after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.delete(of('value').pipe(delay(5)));
    let deleting: boolean | undefined;
    const subscription = cache.deleting$.subscribe((d) => {
      deleting = d;
    });
    tick(6);
    subscription.unsubscribe();
    expect(deleting).toBeFalse();
  }));

  it('should not be deleted for 5ms', () => {
    const cache = new EzCache('');
    cache.delete(of('value').pipe(delay(5)));
    let deleted: boolean | undefined;
    const subscription = cache.deleted$.subscribe((d) => {
      deleted = d;
    });
    subscription.unsubscribe();
    expect(deleted).toBeFalse();
  });

  it('should be deleted after 5ms', fakeAsync(() => {
    const cache = new EzCache('');
    cache.delete(of('value').pipe(delay(5)));
    let deleted: boolean | undefined;
    const subscription = cache.deleted$.subscribe((d) => {
      deleted = d;
    });
    tick(6);
    subscription.unsubscribe();
    expect(deleted).toBeTrue();
  }));

  it('setState should reset deleted', () => {
    const cache = new EzCache('');
    cache.delete(of('value'));
    cache.setState();
    let deleted: boolean | undefined;
    const subscription = cache.deleted$.subscribe((s) => {
      deleted = s;
    });
    subscription.unsubscribe();
    expect(deleted).toBeFalse();
  });
});

describe('EzCache poll', () => {
  it('poll should triger load', () => {
    const cache = new EzCache('');
    cache.poll(of(of('value')));
    expect(cache.value).toEqual('value');
  });
});
