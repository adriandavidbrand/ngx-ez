# EzStoreCache

A reactive store cache for JavaScript.

const cache = new EzStoreCache('your object');

Update the cache with next
cache.next('new value');

Asynchronously load the cache with an observable
cache.load(of('new value'));

cache.loading$ will emit true on calling load and false as the load observable emits
cache.loaded$ will emit false on calling load and true as the load observable emits

Asynchronously save the cache with an observable
cache.save(of('new value'));

cache.saving$ will emit true on calling save and false as the save observable emits
cache.saved$ will emit false on calling save and true as the save observable emits

Asynchronously update the cache with an observable
cache.update(of('new value'));

cache.updating$ will emit true on calling update and false as the update observable emits
cache.updated$ will emit false on calling update and true as the update observable emits

Asynchronously delete the cache with an observable
cache.delete(of('new value'));

cache.deleting$ will emit true on calling delete and false as the delete observable emits
cache.deleted$ will emit false on calling delete and true as the delete observable emits

cache.unsubscribe() unsubscribes all the observable subscriptions
cache.unsubscribe(EzStoreCacheAction.load) unsubscribes the load observable subscriptions
cache.unsubscribe(EzStoreCacheAction.save) unsubscribes the save observable subscriptions
cache.unsubscribe(EzStoreCacheAction.update) unsubscribes the update observable subscriptions
cache.unsubscribe(EzStoreCacheAction.delete) unsubscribes the delete observable subscriptions

cache.complete() unscubscribes all subscriptions and completes all observables
