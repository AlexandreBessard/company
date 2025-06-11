import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
}
