import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { DEFAULT_LANG, Lang, SUPPORTED_LANGS } from './i18n';
import { LanguageService } from './language.service';

/** Production origin — canonical/og/hreflang URLs must be absolute. */
const SITE_ORIGIN = 'https://www.lexoft-eurl.com';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private lang: LanguageService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  /** Subscribe to navigation + language changes and keep all SEO tags in sync. */
  init(): void {
    // Re-evaluate on every navigation AND every (default-)language change.
    // translate.get() waits for the active language file to finish loading,
    // and switchMap guarantees the latest trigger wins.
    merge(
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
      this.translate.onLangChange,
      this.translate.onDefaultLangChange
    )
      .pipe(
        startWith(null),
        switchMap(() => {
          const key = this.deepestData()['seo'] ?? 'home';
          return combineLatest([
            this.translate.get(`seo.${key}.title`),
            this.translate.get(`seo.${key}.description`),
          ]);
        })
      )
      .subscribe(([title, description]) => this.apply(title, description));
  }

  private deepestData(): Record<string, any> {
    let r = this.route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return r.snapshot.data ?? {};
  }

  private apply(title: string, description: string): void {
    const lang = this.lang.current;
    const path = this.router.url.split('#')[0];
    const canonical = SITE_ORIGIN + path;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph / Twitter
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'fr' ? 'fr_FR' : 'en_US' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    // <html lang> — works in browser and during prerendering
    this.doc.documentElement.lang = lang;

    // Canonical + hreflang alternates
    this.setLinkTag('canonical', canonical);
    SUPPORTED_LANGS.forEach((l) => {
      this.setHreflang(l, SITE_ORIGIN + this.lang.swapLangInPath(path, l));
    });
    this.setHreflang('x-default', SITE_ORIGIN + this.lang.swapLangInPath(path, DEFAULT_LANG));
  }

  private setLinkTag(rel: string, href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]:not([hreflang])`);
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setHreflang(hreflang: Lang | 'x-default', href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${hreflang}"]`
    );
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
