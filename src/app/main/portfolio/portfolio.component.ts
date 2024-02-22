import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
