import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { portfolioGuardGuard } from './portfolio.guard';

describe('portfolioGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => portfolioGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
