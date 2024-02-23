import { TestBed } from '@angular/core/testing';

import { PortfolioDetailsService } from './portfolio-details.service';

describe('PortfolioDetailsService', () => {
  let service: PortfolioDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
