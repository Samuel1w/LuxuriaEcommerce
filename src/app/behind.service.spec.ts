import { TestBed } from '@angular/core/testing';

import { BehindService } from './behind.service';

describe('BehindService', () => {
  let service: BehindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
