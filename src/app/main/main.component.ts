import { Component } from '@angular/core';
import {AboutComponent} from "./about/about.component";
import {ValuesComponent} from "./values/values.component";
import {FeaturesComponent} from "./features/features.component";
import {FaqComponent} from "./faq/faq.component";
import {ServicesComponent} from "./services/services.component";
import {TeamComponent} from "./team/team.component";
import {ContactFormComponent} from "./contact-form/contact-form.component";
import {ClientsComponent} from "./clients/clients.component";
import {ExperienceComponent} from "./experience/experience.component";
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HeroComponent} from "../hero/hero.component";

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
    ContactFormComponent,
    ClientsComponent,
    ExperienceComponent,
    CommonModule,
    RouterOutlet,
    HeroComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
