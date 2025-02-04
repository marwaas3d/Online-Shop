import { TestBed } from '@angular/core/testing';

import { ECommerceDataService } from './e-commerce-data.service';

describe('ECommerceDataService', () => {
  let service: ECommerceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommerceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
