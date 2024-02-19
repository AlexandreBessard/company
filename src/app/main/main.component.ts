import { Component } from '@angular/core';
import {AboutComponent} from "./about/about.component";
import {ValuesComponent} from "./values/values.component";
import {FeaturesComponent} from "./features/features.component";
import {FaqComponent} from "./faq/faq.component";
import {ServicesComponent} from "./services/services.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AboutComponent,
    ValuesComponent,
    FeaturesComponent,
    FaqComponent,
    ServicesComponent,
    TeamComponent,
    ContactComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
