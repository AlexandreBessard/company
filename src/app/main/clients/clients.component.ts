import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {SanitizeHtmlPipe} from "../../pipes/sanitizeHtml.pipe";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SanitizeHtmlPipe,
    TranslateModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
