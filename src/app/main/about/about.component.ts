import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
