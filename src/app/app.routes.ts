import { Routes } from '@angular/router';
import { langGuard } from './core/lang.guard';
import { rootRedirectGuard } from './core/root-redirect.guard';
import { portfolioScrollGuard } from './portfolio.guard';

export const routes: Routes = [
  // Root + unknown paths: redirect to a language-prefixed URL.
  { path: '', pathMatch: 'full', canActivate: [rootRedirectGuard], children: [] },

  // Language-prefixed application tree: /fr/... and /en/...
  {
    path: ':lang',
    canActivate: [langGuard],
    children: [
      {
        path: '',
        canActivate: [portfolioScrollGuard],
        loadComponent: () =>
          import('./main/main.component').then((m) => m.MainComponent),
        data: { seo: 'home' },
      },
      {
        path: 'portfolio-details/:id',
        loadComponent: () =>
          import('./main/portfolio/portfolio-details/portfolio-details.component').then(
            (m) => m.PortfolioDetailsComponent
          ),
        data: { seo: 'portfolio' },
      },
      {
        path: 'mentions-legales',
        loadComponent: () =>
          import('./legal/legal-page.component').then((m) => m.LegalPageComponent),
        data: { prefix: 'legal.mentions', seo: 'legal.mentions' },
      },
      {
        path: 'politique-de-confidentialite',
        loadComponent: () =>
          import('./legal/legal-page.component').then((m) => m.LegalPageComponent),
        data: { prefix: 'legal.privacy', seo: 'legal.privacy' },
      },
    ],
  },

  { path: '**', canActivate: [rootRedirectGuard], children: [] },
];
