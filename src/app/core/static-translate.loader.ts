import { makeStateKey, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import fr from '../../assets/i18n/fr.json';
import en from '../../assets/i18n/en.json';

/**
 * Server-side TranslateLoader for prerendering: returns translations from
 * statically-imported JSON (relative HTTP URLs can't be resolved in Node) and
 * stashes them in TransferState so the hydrating browser reuses them without a
 * second fetch or a flash of untranslated keys.
 */
const DICTIONARIES: Record<string, unknown> = { fr, en };

export const i18nStateKey = (lang: string) => makeStateKey<unknown>(`i18n-${lang}`);

export class StaticTranslateLoader implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  getTranslation(lang: string): Observable<unknown> {
    const data = DICTIONARIES[lang] ?? {};
    this.transferState.set(i18nStateKey(lang), data);
    return of(data);
  }
}
