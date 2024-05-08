import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = {};

  constructor(private http: HttpClient) {}

  loadTranslations(lang: string): Observable<any> {
    return this.http.get<any>(`./assets/i18n/${lang}.json`)
      .pipe(
        map(translations => {
          this.translations[lang] = translations;
          return translations;
        }),
        catchError(() => {
          console.error(`Translation file for '${lang}' not found.`);
          return of({});
        })
      );
  }

  translate(key: string, lang: string): string {
    if (!this.translations[lang]) {
      console.error(`Translations not loaded for '${lang}'.`);
      return key;
    }
    return this.translations[lang][key] || key;
  }
}
