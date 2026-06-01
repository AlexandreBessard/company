import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor(translate: TranslateService, seo: SeoService) {
    // The active language is driven by the URL (see langGuard); here we only
    // register the supported set and a fallback for missing keys.
    translate.addLangs([...SUPPORTED_LANGS]);
    translate.setDefaultLang(DEFAULT_LANG);
    seo.init();
  }
}
