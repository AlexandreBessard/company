import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {SanitizeHtmlPipe} from "../../pipes/sanitizeHtml.pipe";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    TranslateModule,
    SanitizeHtmlPipe
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

}
