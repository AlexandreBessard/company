import { Component } from '@angular/core';
import {AboutComponent} from "./about/about.component";
import {ValuesComponent} from "./values/values.component";
import {FeaturesComponent} from "./features/features.component";
import {FaqComponent} from "./faq/faq.component";
import {ServicesComponent} from "./services/services.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";
import {ClientsComponent} from "./clients/clients.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {RouterModule, RouterOutlet} from "@angular/router";
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
    ContactComponent,
    ClientsComponent,
    PortfolioComponent,
    CommonModule,
    RouterOutlet,
    HeroComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
