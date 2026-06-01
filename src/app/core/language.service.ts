import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, Lang, normalizeLang, otherLang } from './i18n';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  /** The active language, derived from the translate service. */
  get current(): Lang {
    return normalizeLang(this.translate.currentLang) ?? DEFAULT_LANG;
  }

  /** Replace the leading /fr or /en segment of a path with another language. */
  swapLangInPath(path: string, lang: Lang): string {
    return path.replace(/^\/(fr|en)(?=\/|$|\?|#)/, `/${lang}`);
  }

  /** Same path/query/fragment as the current URL but in the other language. */
  alternatePath(lang: Lang): string {
    return this.swapLangInPath(this.router.url, lang);
  }

  /** Navigate to the other-language version of the current page, preserving scroll position. */
  toggle(): void {
    const scrollY = isPlatformBrowser(this.platformId) ? window.scrollY : 0;
    this.router.navigateByUrl(this.alternatePath(otherLang(this.current))).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => window.scrollTo(0, scrollY), 0);
      }
    });
  }
}
