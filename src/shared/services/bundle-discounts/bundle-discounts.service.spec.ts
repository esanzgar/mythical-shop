import { TestBed } from '@angular/core/testing';

import { BundleDiscountsService } from './bundle-discounts.service';

describe('BundleDiscountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BundleDiscountsService = TestBed.get(BundleDiscountsService);
    expect(service).toBeTruthy();
  });
});
