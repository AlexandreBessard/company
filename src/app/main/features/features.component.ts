import { Component } from '@angular/core';
import {FeatureIconsComponent} from "./feature-icons/feature-icons.component";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    FeatureIconsComponent
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
