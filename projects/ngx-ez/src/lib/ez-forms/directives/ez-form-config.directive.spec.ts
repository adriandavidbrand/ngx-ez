import { waitForAsync } from '@angular/core/testing';

import { EzFormConfigDirective } from './ez-form-config.directive';
import { EzFormConfigService } from '../services/ez-form-config.service';
import { firstEmitted } from '../../ez-core/functions/first-emitted';

describe('EzFormConfigDirective', () => {
  let config: EzFormConfigService;

  beforeEach(() => {
    config = {} as EzFormConfigService;
  });

  it('should create an instance', () => {
    const directive = new EzFormConfigDirective(config);
    expect(directive).toBeTruthy();
  });

  it('should override property', waitForAsync(async () => {
    const directive = new EzFormConfigDirective(config);
    directive.ezFormConfig = { prop: 'value' };
    const overriddenConfig = await firstEmitted(directive.config$);
    expect(overriddenConfig.prop).toEqual('value');
  }));
});
