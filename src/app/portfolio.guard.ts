import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const portfolioScrollGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true;

  const from = next.queryParams['from'];

  if (from === 'portfolio') {
    setTimeout(() => {
      document.getElementById('portfolio')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 100);
  }

  return true;
};
