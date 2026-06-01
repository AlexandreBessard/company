import { Component, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {ValuesComponent} from "./values/values.component";
import {FeaturesComponent} from "./features/features.component";
import {FaqComponent} from "./faq/faq.component";
import {ServicesComponent} from "./services/services.component";
import {TeamComponent} from "./team/team.component";
import {ContactFormComponent} from "./contact-form/contact-form.component";
import {ClientsComponent} from "./clients/clients.component";
import {ExperienceComponent} from "./experience/experience.component";
import {ProjectsComponent} from "./projects/projects.component";
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
    ProjectsComponent,
    CommonModule,
    RouterOutlet,
    HeroComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = this.route.snapshot.queryParams['from'];
    if (target === 'contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({
          behavior: 'instant' as ScrollBehavior,
          block: 'start',
        });
      }, 0);
    }
  }
}
