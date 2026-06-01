import { Component, Inject, OnInit, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import AOS from 'aos';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPipe } from '../pipes/sanitizeHtml.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule, SanitizeHtmlPipe, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Recompute AOS trigger points once the app is fully rendered/hydrated and
    // the DOM is stable. afterNextRender only runs in the browser, after the
    // prerendered markup has hydrated, so AOS re-scans the *final* nodes and
    // their real positions — otherwise sections far down the page (e.g.
    // Expérience) can keep stale offsets and stay stuck at opacity:0 on the
    // static S3 deploy. refreshHard() re-reads the DOM, not just the offsets.
    afterNextRender(() => AOS.refreshHard());
  }

  ngOnInit(): void {
    // AOS touches the DOM/window — browser only.
    if (isPlatformBrowser(this.platformId)) {
      // Smoother reveals than the AOS defaults (longer, gentler easing) while
      // keeping the default trigger logic, which continuously re-evaluates so
      // no section can get stuck hidden if positions shift after images load.
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        disable: () =>
          window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
      // Recalculate trigger points once images/fonts have settled. On the
      // prerendered (S3) deploy the `load` event can fire *before* hydration
      // runs this code, so a plain listener would never execute — run it
      // immediately in that case instead of waiting for an event that's gone.
      if (document.readyState === 'complete') {
        AOS.refreshHard();
      } else {
        window.addEventListener('load', () => AOS.refreshHard(), { once: true });
      }
    }
  }
}
