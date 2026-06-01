import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationStart, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, SUPPORTED_LANGS } from './core/i18n';
import { SeoService } from './core/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LEXOFT';

  /** 0–100 % of the page scrolled — drives the top gradient progress bar. */
  scrollProgress = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    this.scrollProgress = max > 0 ? (el.scrollTop / max) * 100 : 0;
  }

  private platformId = inject(PLATFORM_ID);

  constructor(translate: TranslateService, seo: SeoService, router: Router) {
    translate.addLangs([...SUPPORTED_LANGS]);
    translate.setDefaultLang(DEFAULT_LANG);
    seo.init();

    // Prevent the global `scroll-behavior: smooth` from animating Angular's
    // scroll-position reset on NavigationEnd. Without this, clicking a routerLink
    // causes the current page to visibly scroll to the top before the new route renders.
    if (isPlatformBrowser(this.platformId)) {
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          document.documentElement.style.scrollBehavior = 'auto';
        } else if (event instanceof NavigationEnd) {
          setTimeout(() => document.documentElement.style.scrollBehavior = '', 0);
        }
      });
    }
  }
}
