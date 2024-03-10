import { Component } from '@angular/core';
import {FeatureIconsComponent} from "./feature-icons/feature-icons.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    FeatureIconsComponent,
    TranslateModule
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
