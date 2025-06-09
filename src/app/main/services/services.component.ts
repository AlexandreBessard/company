import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
