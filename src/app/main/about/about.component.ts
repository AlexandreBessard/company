import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
