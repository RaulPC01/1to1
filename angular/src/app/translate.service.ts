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

  // carga las traducciones desde un archivo json
  loadTranslations(lang: string): Observable<any> {
    return this.http.get<any>(`./assets/i18n/${lang}.json`)
      .pipe(
        map(translations => {
          this.translations[lang] = translations;
          return translations;
        }),
        catchError(() => {
          console.error(`archivo de traduccion para '${lang}' no encontrado.`);
          return of({});
        })
      );
  }

  // traduce una clave especifica usando el lenguaje proporcionado
  translate(key: string, lang: string): string {
    if (!this.translations[lang]) {
      console.error(`traducciones no cargadas para '${lang}'.`);
      return key;
    }
    return this.translations[lang][key] || key;
  }
}
