import { Routes } from '@angular/router';
import {PortfolioGuard } from "./portfolio.guard";

export const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./main/main.component').then((m) => m.MainComponent),
    canActivate: [PortfolioGuard]
  },
  {
    path: 'home/portfolio-details/:id',
    loadComponent: () =>
      import('./main/portfolio/portfolio-details/portfolio-details.component').then(
        (m) => m.PortfolioDetailsComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];
