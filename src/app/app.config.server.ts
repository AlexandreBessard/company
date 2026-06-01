import { mergeApplicationConfig, ApplicationConfig, TransferState } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader } from '@ngx-translate/core';
import { appConfig } from './app.config';
import { StaticTranslateLoader } from './core/static-translate.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Override the HTTP translation loader with a bundled, synchronous one so
    // translations are available while prerendering in Node, and stash them in
    // TransferState for the hydrating browser.
    {
      provide: TranslateLoader,
      useFactory: (transferState: TransferState) => new StaticTranslateLoader(transferState),
      deps: [TransferState],
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
