import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = {};
  public currentLang: string = 'es'; // Idioma predeterminado

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang).subscribe();
  }

  // carga las traducciones desde un archivo json
  loadTranslations(lang: string): Observable<any> {
    return this.http.get<any>(`./assets/i18n/${lang}.json`)
      .pipe(
        map(translations => {
          this.translations[lang] = translations;
          return translations;
        }),
        catchError(() => {
          console.error(`No se encontró el archivo para '${lang}'.`);
          return of({});
        })
      );
  }

  // traduce una clave especifica usando el lenguaje proporcionado
  translate(key: string, lang: string): string {
    if (!this.translations[lang]) {
      console.error(`Traducciones no cargadas en el lenguaje: '${lang}'.`);
      return key;
    }
    return this.translations[lang][key] || key;
  }
}
