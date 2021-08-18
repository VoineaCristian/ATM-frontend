import { TestBed } from '@angular/core/testing';

import { AtmServiceService } from './atm-service.service';

describe('AtmServiceService', () => {
  let service: AtmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
