import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPipe } from '../pipes/sanitizeHtml.pipe';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [RouterLink, TranslateModule, SanitizeHtmlPipe],
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.css',
})
export class LegalPageComponent implements OnInit {
  // Translation key prefix, e.g. "legal.mentions" or "legal.privacy"
  prefix = '';

  constructor(
    private route: ActivatedRoute,
    public lang: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.prefix = this.route.snapshot.data['prefix'] ?? '';
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
