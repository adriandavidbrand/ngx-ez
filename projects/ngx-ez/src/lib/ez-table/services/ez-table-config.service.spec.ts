import { TestBed } from '@angular/core/testing';

import { EzTableConfigService } from './ez-table-config.service';

describe('EzTableConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EzTableConfigService = TestBed.get(EzTableConfigService);
    expect(service).toBeTruthy();
  });
});
