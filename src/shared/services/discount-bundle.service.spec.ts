import { TestBed } from '@angular/core/testing';

import { DiscountBundleService } from './discount-bundle.service';

describe('DiscountBundleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountBundleService = TestBed.get(DiscountBundleService);
    expect(service).toBeTruthy();
  });
});
