import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, CommonModule} from "@angular/common";
import {PortfolioDetailsService} from "./portfolio-details.service";
import {filter, map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent implements OnInit {

  portfolioService = inject(PortfolioDetailsService);
  portfolio$!: Observable<any>;
  id?: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.portfolio$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      map((id) => {
        if ((id !== '1' && id !== '2')) {
          this.router.navigate(['/']);
          return null;
        }
        return this.portfolioService.getById(id as string) || null;
      })
    );
  }
}
