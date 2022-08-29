import { EzFormConfigDirective } from './ez-form-config.directive';
import { EzFormConfigService } from '../services/ez-form-config.service';

describe('EzFormConfigDirective', () => {
  let config: EzFormConfigService;

  beforeEach(() => {
    config = {} as EzFormConfigService;
  });

  it('should create an instance', () => {
    const directive = new EzFormConfigDirective(config);
    expect(directive).toBeTruthy();
  });

  it('should override property', () => {
    const directive = new EzFormConfigDirective(config);
    directive.ezFormConfig = { checkboxClasses: 'value' };
    const sub = directive.config$.subscribe((overriddenConfig) => {
      expect(overriddenConfig?.checkboxClasses).toEqual('value');
    });
    sub.unsubscribe();
  });
});
