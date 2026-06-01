import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../pipes/sanitizeHtml.pipe";
import { LanguageService } from '../core/language.service';
import { FragmentScrollDirective } from '../directives/fragment-scroll.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    SanitizeHtmlPipe,
    FragmentScrollDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public lang: LanguageService) {}
}
