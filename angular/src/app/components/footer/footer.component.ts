import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.translateService.setDefaultLang('es'); // Establece el idioma por defecto como español
  }

  cambiarIdioma(idioma: string): void {
    this.translateService.use(idioma); // Cambia el idioma utilizando el servicio de traducción
  }

  // Método para navegar y desplazarse hacia arriba
  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]); // Desplázate hacia la parte superior de la página
    });
  }
}
