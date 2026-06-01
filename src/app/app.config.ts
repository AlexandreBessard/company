import { ApplicationConfig, importProvidersFrom, TransferState } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserTranslateLoader } from './core/browser-translate.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    // withFetch() is recommended for SSR/prerendering (perf + compatibility).
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, TransferState],
        },
      })
    ),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideClientHydration(),
  ],
};

export function HttpLoaderFactory(http: HttpClient, transferState: TransferState): BrowserTranslateLoader {
  return new BrowserTranslateLoader(http, transferState);
}
