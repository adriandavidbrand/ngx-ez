import { waitForAsync } from '@angular/core/testing';

import { PushStack } from './push-stack';
import { firstEmitted } from '../functions/first-emitted';
import { BehaviorSubject } from 'rxjs';

describe('push-stack', () => {
  it('should emit value', waitForAsync(async () => {
    const pushStack$ = new PushStack('value', undefined);
    const value = await firstEmitted(pushStack$);
    expect(value).toEqual('value');
  }));

  it('should emit default value', waitForAsync(async () => {
    const pushStack$ = new PushStack(undefined, 'default value');
    const value = await firstEmitted(pushStack$);
    expect(value).toEqual('default value');
  }));

  it('should emit parent value', waitForAsync(async () => {
    const parent$ = new BehaviorSubject<string>('parent value');
    const pushStack$ = new PushStack(undefined, undefined, parent$);
    const value = await firstEmitted(pushStack$);
    expect(value).toEqual('parent value');
  }));
});
