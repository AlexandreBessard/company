import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


  constructor(private router: Router) {}

  ngOnInit() {}

  scrollToElement(elementId: string) {
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 100); // Adjust the timeout value as needed to ensure the home page is fully loaded before scrolling
    });
  }
}
