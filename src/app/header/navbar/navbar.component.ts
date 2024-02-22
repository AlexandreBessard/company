import {Component, OnInit, Renderer2} from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }
}
