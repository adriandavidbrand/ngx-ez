import { waitForAsync } from '@angular/core/testing';

import { firstTruthy } from './first-truthy';
import { firstEmitted } from '../functions/first-emitted';
import { BehaviorSubject } from 'rxjs';

describe('first-truthy', () => {
  it('no paramaters should emit undefined', waitForAsync(async () => {
    const obs$ = firstTruthy();
    const value = await firstEmitted(obs$);
    expect(value).toBeUndefined();
  }));

  it('undefined should emit default undefined', waitForAsync(async () => {
    const obs$ = firstTruthy(undefined);
    const value = await firstEmitted(obs$);
    expect(value).toBeUndefined();
  }));

  it('should emit value', waitForAsync(async () => {
    const behaviorSubject$ = new BehaviorSubject<string>('value');
    const obs$ = firstTruthy(behaviorSubject$);
    const value = await firstEmitted(obs$);
    expect(value).toEqual('value');
  }));

  it('should emit first value', waitForAsync(async () => {
    const first$ = new BehaviorSubject<string>('first value');
    const second$ = new BehaviorSubject<string>('second value');
    const obs$ = firstTruthy(first$, second$);
    const value = await firstEmitted(obs$);
    expect(value).toEqual('first value');
  }));

  it('should emit second value', waitForAsync(async () => {
    const first$ = new BehaviorSubject<string>(undefined);
    const second$ = new BehaviorSubject<string>('second value');
    const obs$ = firstTruthy(first$, second$);
    const value = await firstEmitted(obs$);
    expect(value).toEqual('second value');
  }));
});
