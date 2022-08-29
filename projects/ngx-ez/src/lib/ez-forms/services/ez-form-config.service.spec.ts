import { TestBed } from '@angular/core/testing';

import { EzFormConfigService } from './ez-form-config.service';

describe('EzFormConfigService', () => {
  let service: EzFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EzFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
