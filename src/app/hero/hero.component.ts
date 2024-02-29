import {Component, OnInit} from '@angular/core';
import 'aos/dist/aos.css';
import AOS from 'aos';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  private toggle: boolean = false;
  defaultLanguageIsEnglish: boolean = true;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.setDefaultLanguage();
    AOS.init();
  }

  toggleLanguage(): void {
    this.toggle = !this.toggle;
    const newLanguage = this.toggle ? 'fr' : 'en';
    this.translate.use(newLanguage);
    // Store language preference in local storage
    localStorage.setItem('preferredLanguage', newLanguage);
  }

  private language1 : string | undefined;

  // TODO: need to be refactored
  private setDefaultLanguage(): void {
    const language = this.translate.getBrowserLang() || 'en';
    if (localStorage.getItem("preferredLanguage") === 'fr') {
      const language = localStorage.getItem("preferredLanguage");
      if (language === 'fr') {
        this.defaultLanguageIsEnglish = false;
        this.toggle = true;
        localStorage.setItem("preferredLanguage", 'fr');
        return;
      } else {
        this.defaultLanguageIsEnglish = true;
        this.toggle = false;
        localStorage.setItem("preferredLanguage", 'en');
      }
    } else if (language === 'en') {
      this.defaultLanguageIsEnglish = true;
      localStorage.setItem("preferredLanguage", language);
    }
  }
}
