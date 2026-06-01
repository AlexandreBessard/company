import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
      // Recalculate trigger points once images/fonts have settled.
      window.addEventListener('load', () => AOS.refresh());
    }
  }
}
