import { TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';
import { i18nStateKey } from './static-translate.loader';

/**
 * Browser TranslateLoader: reuses translations embedded in TransferState by the
 * server (prerender) when present — instant, hydration-safe, no flash — and
 * falls back to the normal HTTP fetch otherwise.
 */
export class BrowserTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private transferState: TransferState
  ) {}

  getTranslation(lang: string): Observable<unknown> {
    const cached = this.transferState.get<unknown>(i18nStateKey(lang), null);
    if (cached) {
      return of(cached);
    }
    return new TranslateHttpLoader(this.http).getTranslation(lang);
  }
}
