import { TestBed } from '@angular/core/testing';

import { EzTableConfigService } from './ez-table-config.service';

describe('EzTableConfigService', () => {
  let service: EzTableConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EzTableConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
