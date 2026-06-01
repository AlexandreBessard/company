import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, normalizeLang } from './i18n';

/**
 * Activates a `:lang` route segment: validates it, sets the active translation
 * language, and (in the browser) syncs <html lang> + the stored preference.
 * Invalid language segments redirect to the default language.
 */
export const langGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const translate = inject(TranslateService);
  const platformId = inject(PLATFORM_ID);

  const lang = normalizeLang(route.paramMap.get('lang'));
  if (!lang) {
    return router.createUrlTree([DEFAULT_LANG]);
  }

  translate.use(lang);

  if (isPlatformBrowser(platformId)) {
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
  }

  return true;
};
