import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent {
  precio!: number;
  mensajeError: string = '';

  validarPrecio() {
    if (this.precio < 0) {
      this.mensajeError = 'El precio no puede ser negativo';
    } else {
      this.mensajeError = ''; 
    }
  }
}
