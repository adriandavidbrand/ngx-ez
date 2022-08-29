import { of, throwError } from 'rxjs';

import { EzArrayCache } from './ez-array-cache';

describe('EzArrayCache', () => {
  it('value should be []', () => {
    const cache = new EzArrayCache('id', {}, []);
    expect(cache.value).toEqual([]);
  });

  it('save should add item', () => {
    const cache = new EzArrayCache(
      'id',
      { id: undefined as number | undefined },
      []
    );
    cache.save(of({ id: 1 }));
    expect(cache.value[0].id).toEqual(1);
  });

  it('save with ignore response should not update', () => {
    const cache = new EzArrayCache('id', { id: undefined }, []);
    cache.save(of({ id: 1 }), true);
    expect(cache.value.length).toEqual(0);
  });

  it('save error should update saveError$', () => {
    const cache = new EzArrayCache('id');
    cache.save(throwError(() => 'save error'));
    let error: string | undefined;
    const subscription = cache.saveError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('save error');
  });

  it('update should update item', () => {
    const cache = new EzArrayCache('id', { id: undefined }, [
      { id: 1, value: 'initial' },
      { id: 2, value: 'initial' },
    ]);
    cache.update(of({ id: 1, value: 'updated' }));
    expect(cache.value[0].value).toEqual('updated');
  });

  it('update with ignore response should not update', () => {
    const cache = new EzArrayCache('id', { id: undefined }, [
      { id: 1, value: 'initial' },
    ]);
    cache.update(of({ id: 1, value: 'updated' }), true);
    expect(cache.value[0].value).toEqual('initial');
  });

  it('update error should update updateError$', () => {
    const cache = new EzArrayCache('id');
    cache.update(throwError(() => 'update error'));
    let error: string | undefined;
    const subscription = cache.updateError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('update error');
  });

  it('updateBulk should update item', () => {
    const cache = new EzArrayCache('id', { id: undefined }, [
      { id: 1, value: 'initial' },
      { id: 2, value: 'initial' },
    ]);
    cache.updateBulk(of([{ id: 1, value: 'updated' }]));
    expect(cache.value[0].value).toEqual('updated');
  });

  it('updateBulk should add item', () => {
    const cache = new EzArrayCache('id', { id: undefined }, [
      { id: 1, value: 'initial' },
      { id: 2, value: 'initial' },
    ]);
    cache.updateBulk(of([{ id: 3, value: 'updated' }]));
    expect(cache.value[2].value).toEqual('updated');
  });

  it('updateBulk error should update updateError$', () => {
    const cache = new EzArrayCache('id');
    cache.updateBulk(throwError(() => 'update error'));
    let error: string | undefined;
    const subscription = cache.updateError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('update error');
  });

  it('delete should remove item', () => {
    const cache = new EzArrayCache('id', { id: undefined }, [{ id: 1 }]);
    cache.delete(of({ id: 1 }));
    expect(cache.value.length).toEqual(0);
  });

  it('delete with ignore response should not update', () => {
    const cache = new EzArrayCache('id', { id: undefined }, [{ id: 1 }]);
    cache.delete(of({ id: 1 }), true);
    expect(cache.value.length).toEqual(1);
  });

  it('delete error should update deleteError$', () => {
    const cache = new EzArrayCache('id');
    cache.delete(throwError(() => 'delete error'));
    let error: string | undefined;
    const subscription = cache.deleteError$.subscribe((e) => {
      error = e;
    });
    subscription.unsubscribe();
    expect(error).toEqual('delete error');
  });

  it('item should emit defaultObj', () => {
    const cache = new EzArrayCache<{ id: number }>('id', { id: 0 }, [
      { id: 1 },
    ]);
    let item: { id: number } | undefined;
    const subscription = cache.item$.subscribe((i) => {
      item = i;
    });
    subscription.unsubscribe();
    expect(item).toEqual({ id: 0 });
  });

  it('select should emit item', () => {
    const cache = new EzArrayCache<{ id: number }>('id', { id: 0 }, [
      { id: 1 },
    ]);
    let item: { id: number } | undefined;
    cache.select(1);
    const subscription = cache.item$.subscribe((i) => {
      item = i;
    });
    subscription.unsubscribe();
    expect(item).toEqual({ id: 1 });
  });
});
