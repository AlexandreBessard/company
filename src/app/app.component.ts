import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HeroComponent} from "./hero/hero.component";
import {MainComponent} from "./main/main.component";
import {FooterComponent} from "./footer/footer.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, MainComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LEXOFT';

  constructor(private translate: TranslateService) {
    // fall-back language that is used if a translation can not be found.
    //translate.setDefaultLang('fr');
    // Gives fr or en
    const language: string | undefined = translate.getBrowserLang() || 'en';
    translate.use(language);
    localStorage.setItem("preferredLanguage", language);
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
