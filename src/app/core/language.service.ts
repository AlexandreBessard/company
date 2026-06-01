import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, Lang, normalizeLang, otherLang } from './i18n';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private platformId = inject(PLATFORM_ID);

  /** Scroll position to keep across a language toggle (null when not toggling). */
  private pendingScrollY: number | null = null;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    // The router (scrollPositionRestoration: 'enabled') scrolls to the top on every
    // navigation by reacting to its own `Scroll` event. A language toggle is a
    // navigation too, so it would jump to the top. We listen for that same `Scroll`
    // event and, when a toggle is pending, re-apply the saved position (see handler).
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((e) => {
        if (e instanceof Scroll && this.pendingScrollY !== null) {
          const y = this.pendingScrollY;
          this.pendingScrollY = null;
          // The router scrolls to the top on navigation, and the site's global
          // `scroll-behavior: smooth` would animate it. Re-assert the saved position
          // with `behavior: 'instant'` (which also cancels any in-flight smooth
          // scroll). A microtask runs after every synchronous `Scroll` subscriber —
          // including the router's own scroll handler, whatever the subscription
          // order — but before the frame paints, so the top never becomes visible.
          // The component is reused (DOM preserved), so `y` is never clamped.
          const snap = () =>
            window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior });
          queueMicrotask(snap);
          // Safety net: re-assert next frame in case a smooth animation lingers.
          requestAnimationFrame(snap);
        }
      });
    }
  }

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
    if (isPlatformBrowser(this.platformId)) {
      // Captured here, re-applied in the `Scroll` handler above once navigation lands.
      this.pendingScrollY = window.scrollY;
    }
    this.router.navigateByUrl(this.alternatePath(otherLang(this.current)));
  }
}
