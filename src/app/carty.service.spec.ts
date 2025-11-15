import { TestBed } from '@angular/core/testing';

import { CartyService } from './carty.service';

describe('CartyService', () => {
  let service: CartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
