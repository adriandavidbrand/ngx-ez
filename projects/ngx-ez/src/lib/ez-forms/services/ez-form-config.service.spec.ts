import { TestBed } from '@angular/core/testing';

import { EzFormConfigService } from './ez-form-config.service';

describe('EzFormConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EzFormConfigService = TestBed.get(EzFormConfigService);
    expect(service).toBeTruthy();
  });
});
