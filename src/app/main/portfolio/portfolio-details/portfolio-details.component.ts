import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {AsyncPipe, CommonModule} from "@angular/common";
import {PortfolioDetailsService} from "./portfolio-details.service";
import {filter, map, Observable, tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterModule
  ],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent implements OnInit {

  portfolioService = inject(PortfolioDetailsService);
  portfolio$!: Observable<any>;
  id?: string | null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.portfolio$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      map((id) => {
        if ((id !== '1' && id !== '2')) {
          this.router.navigate(['/']);
          return null;
        }
        if (this.isEnglish()) {
          return this.portfolioService.getByIdInEnglishContent(id as string) || null;
        }
        return this.portfolioService.getById(id as string) || null;
      })
    );
  }

  isFrench(): boolean {
    return this.translate.currentLang === 'fr';
  }

  isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }

}
