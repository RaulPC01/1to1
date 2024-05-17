import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private translateService: TranslateService) {
    // establece el idioma por defecto a español
    this.translateService.setDefaultLang('es'); 
  }

  cambiarIdioma(event: Event): void {
    // cambia el idioma basado en la seleccion del usuario
    const selectElement = event.target as HTMLSelectElement;
    const idioma = selectElement.value;
    this.translateService.use(idioma); 
  }

}
