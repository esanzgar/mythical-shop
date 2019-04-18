import { TestBed } from '@angular/core/testing';

import { CurrencyResolverService } from './currency-resolver.service';

describe('CurrencyResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyResolverService = TestBed.get(
      CurrencyResolverService
    );
    expect(service).toBeTruthy();
  });
});
