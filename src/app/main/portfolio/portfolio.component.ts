import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {CommonModule, NgOptimizedImage, ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
