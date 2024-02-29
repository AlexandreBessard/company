import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-values',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './values.component.html',
  styleUrl: './values.component.css'
})
export class ValuesComponent {

}
