import { Directive, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Makes same-page fragment links (`<a href="#section">`) scroll to their target.
 *
 * The app sets `<base href="/">`, so the browser resolves a bare `#section` href
 * against the base as `/#section` — i.e. the root route — which `rootRedirectGuard`
 * then redirects to `/<lang>`, dropping the fragment and going nowhere. This
 * directive intercepts the click, cancels that broken navigation, and smooth-scrolls
 * to the element whose id matches the fragment instead.
 */
@Directive({
  // Angular directive selectors only support exact `=` attribute matching (no `^=`),
  // so we match every `a[href]` and narrow to fragment links inside the handler.
  selector: 'a[href]',
  standalone: true,
})
export class FragmentScrollDirective {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const href = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (!href || !href.startsWith('#')) return; // leave external/normal links alone
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
