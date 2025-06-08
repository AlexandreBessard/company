import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {NgStyle} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
declare var bootstrap: any;


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgStyle, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  private toggle: boolean = false;
  defaultLanguageIsEnglish: boolean = true;


  constructor(private router: Router,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.setDefaultLanguage();

    // Initialize Bootstrap components
    //var navbarCollapse = new bootstrap.Collapse(document.getElementById('navbarNav'));
  }

  scrollToElement(elementId: string) {
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 100); // Adjust the timeout value as needed to ensure the home page is fully loaded before scrolling
    });
  }

  toggleLanguage(): void {
    this.toggle = !this.toggle;
    const newLanguage = this.toggle ? 'fr' : 'en';
    this.translate.use(newLanguage);
    // Store language preference in local storage
    localStorage.setItem('preferredLanguage', newLanguage);
  }

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

  closeNavbar() {
    const navbar = document.getElementById('navbarNavAltMarkup');
    const bsCollapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar!, { toggle: false });
    bsCollapse.hide();
  }


}
