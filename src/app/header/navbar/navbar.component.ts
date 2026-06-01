import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/language.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private router: Router,
    public lang: LanguageService
  ) {}

  /** Drives the EN/FR switch state. */
  get isEnglish(): boolean {
    return this.lang.current === 'en';
  }

  toggleLanguage(): void {
    this.lang.toggle();
  }

  /** Navigate to the current-language home, then smooth-scroll to a section. */
  scrollToElement(elementId: string): void {
    this.router.navigate(['/', this.lang.current]).then(() => {
      setTimeout(() => {
        document.getElementById(elementId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 100);
    });
  }

  closeNavbar(): void {
    const navbar = document.getElementById('navbarNavAltMarkup');
    if (!navbar) {
      return;
    }
    const bsCollapse =
      bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar, { toggle: false });
    bsCollapse.hide();
  }
}
