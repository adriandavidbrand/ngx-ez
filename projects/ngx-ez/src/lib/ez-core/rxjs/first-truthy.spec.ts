import { async } from '@angular/core/testing';

import { firstTruthy } from './first-truthy';
import { firstEmitted } from '../../ez-testing/first-emitted';
import { BehaviorSubject } from 'rxjs';

describe('first-truthy', () => {
  it('no paramaters should emit undefined', async(async () => {
    const obs$ = firstTruthy();
    const value = await firstEmitted(obs$);
    expect(value).toBeUndefined();
  }));

  it('undefined should emit default undefined', async(async () => {
    const obs$ = firstTruthy(undefined);
    const value = await firstEmitted(obs$);
    expect(value).toBeUndefined();
  }));

  it('should emit value', async(async () => {
    const behaviorSubject$ = new BehaviorSubject<string>('value');
    const obs$ = firstTruthy(behaviorSubject$);
    const value = await firstEmitted(obs$);
    expect(value).toEqual('value');
  }));

  it('should emit first value', async(async () => {
    const first$ = new BehaviorSubject<string>('first value');
    const second$ = new BehaviorSubject<string>('second value');
    const obs$ = firstTruthy(first$, second$);
    const value = await firstEmitted(obs$);
    expect(value).toEqual('first value');
  }));

  it('should emit second value', async(async () => {
    const first$ = new BehaviorSubject<string>(undefined);
    const second$ = new BehaviorSubject<string>('second value');
    const obs$ = firstTruthy(first$, second$);
    const value = await firstEmitted(obs$);
    expect(value).toEqual('second value');
  }));
});
