# EzCache

EzCache is a helper class to help write functional reactive Angular services.
A reactive functional service exposes observables that provide the data and state of the data such as loading and saving flags.

The internal storage mechanism of the cache is a BehaviorSubject of type EzState<T>

```JavaScript
export interface EzState<T> {
  value: T;
  loading?: boolean;
  loaded?: boolean;
  loadError?: any;
  saving?: boolean;
  saved?: boolean;
  saveError?: any;
  updating?: boolean;
  updated?: boolean;
  updateError?: any;
  deleting?: boolean;
  deleted?: boolean;
  deleteError?: any;
}
```

Calling the load, save, update and delete methods with an observable that calls the api will automatically manage
the state properties and update the value.

There are helper methods on the cache to generate observables that emit the state properties. loading$, loaded$,
loadError$, saving$, saved$, saveError$, updating$, updated$, updateError$, deleting$ and deleted$, deleteError$ all
return an observable that represents that property from the state. There are also compound observables that look at
multiple properties including savingOrUpdating$, savedOrUpdated$ and error$.

The load method takes an observable that will be used to retrieve the data from the api. When load is called the
loading$ flag will emit true and loaded$ will emit false. Once the source observable emits, loaded$ will emit true
and loading$ will emit false and the value$ observable will emit the data returned from the api. If an error occurs
loaded$ will emit false and loadError$ will emit the error.

Below is an example to use a cache to create a data service.

```JavaScript
@Injectable({
  providedIn: 'root'
})
export class TestService {
  private testCache = new EzCache<TestDTO>();

  test$ = this.testCache.value$;
  loading$ = this.testCache.loading$;
  error$ = this.testCache.error$;

  constructor(private apiService: ApiService) { }

  load(id: string) {
    this.testCache.load(this.apiService.getTestData(id));
  }

  reset() {
    this.testCache.next(null);
  }
}
```

In this example service we instantiate a cache to hold the data of type TestDTO. We can then add properties to the
service which expose the data and state flags. The load method passes in an observable to retrieve the data from
the api and the reset method resets the cache.

This service can then be used by components. Below is an example component that uses the service.

```JavaScript
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
})
  export class TestComponent {
  test$ = this.testService.test$;
  loading$ = this.testService.loading$;
  error$ = this.testService.error$;

  constructor(testService: TestService) { }
}
```

We can now use these observables directly in the template by using the async pipe without have to subscribe to them in the component's class.

```html
<app-error *ngIf="error$ | async as error">{{ error }}</app-error>
<app-spinner *ngIf="loading$ | async else loaded">loading</app-spinner>
<ng-template #loaded> {{ test$ | async }} </ng-template>
```

By using the async pipe we can have Angular mange all the subscriptions for us.
We can show an error if error$ emits by using \*ngIf with the async pipe and assigning the emitted value to a view variable called error.

# EzArrayCache

The EzArrayCache is similar to the EzCache helper class but it is designed to hold an manage arrays of data.

To create a new cache the signature is

```JavaScript
EzArrayCache<InterfaceOfTheArrayItems>('stringNameOftheIdProperty', defaultObjectToEmitWhenTheIdIsNull);
```

```JavaScript
myCache = new EzArrayCache<TestDTO>('id', { id: 0 });
```

This will create a cache for holding an array of TestDTO objects that has an id property of type number called id.

The main difference between an array cache and a normal cache is there is no value$ observable but instead items$ and item$.

item$ emits the entire array.

The select method takes the id of the item to select and then item$ will emit the item matching the id.

The load method is the same as it takes an observable that emits an array to populate the cache with.

The save method takes an observable that emits a new item to be added to the array stored in the cache.

The update method takes an observable that emits a value to replace an existing item in the array with a matching id.

The delete method takes an observable that emits a value where the id of that value will be used to remove an item from the array stored in the cache.
