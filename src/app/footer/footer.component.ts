import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../pipes/sanitizeHtml.pipe";
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public lang: LanguageService) {}
}
