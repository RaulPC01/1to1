import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('es'); // Establece el idioma por defecto como español
  }

  cambiarIdioma(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const idioma = selectElement.value;
    this.translateService.use(idioma); // Cambia el idioma utilizando el servicio de traducción
  }

}
