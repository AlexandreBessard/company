import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { DEFAULT_LANG, normalizeLang } from './i18n';

/**
 * Root (`/`) and wildcard redirect: sends the visitor to a language-prefixed
 * URL. In the browser we honour a stored preference, then the browser language;
 * during prerendering (Node) we fall back to the default language.
 */
export const rootRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  let lang = DEFAULT_LANG;
  if (isPlatformBrowser(platformId)) {
    const stored = normalizeLang(localStorage.getItem('preferredLanguage'));
    const browser = normalizeLang(navigator.language);
    lang = stored ?? browser ?? DEFAULT_LANG;
  }

  return router.createUrlTree([lang]);
};
