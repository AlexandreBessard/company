import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

}
