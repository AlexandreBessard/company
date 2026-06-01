import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

/**
 * When the home route is reached with `?from=portfolio`, smooth-scroll to the
 * #portfolio anchor once the view has rendered. No-op during prerendering.
 */
export const portfolioScrollGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId) && next.queryParams['from'] === 'portfolio') {
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
