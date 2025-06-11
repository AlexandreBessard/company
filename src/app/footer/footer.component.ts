import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
