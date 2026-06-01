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
      AOS.init();
    }
  }
}
