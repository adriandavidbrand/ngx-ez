import { async } from '@angular/core/testing';

import { EzConfigDirective } from './ez-config.directive';
import { EzFormConfigService } from '../services/ez-form-config.service';
import { firstEmitted } from '../../ez-testing/first-emitted';

fdescribe('EzConfigDirective', () => {
  let config: EzFormConfigService;

  beforeEach(() => {
    config = {} as EzFormConfigService;
  });

  it('should create an instance', () => {
    const directive = new EzConfigDirective(config);
    expect(directive).toBeTruthy();
  });

  it('should override property', async(async () => {
    const directive = new EzConfigDirective(config);
    directive.config = { prop: 'value' };
    const overriddenConfig = await firstEmitted(directive.config$);
    expect(overriddenConfig.prop).toEqual('value');
  }));
});
