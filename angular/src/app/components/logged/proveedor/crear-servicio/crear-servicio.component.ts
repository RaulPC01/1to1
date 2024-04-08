import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent {
  precio!: number;
  mensajeError: string = '';
  provincias: any[] = [];
  provinciaSeleccionada: string | undefined;
  ciudadesPorProvincia: { [key: string]: any[] } = {};
  ciudadSeleccionada: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('/assets/ciudadesEspana.json').subscribe(data => {
      this.provincias = data;
      this.provincias.forEach(provincia => {
        this.ciudadesPorProvincia[provincia.code] = provincia.towns;
      });
    });
  }

  validarPrecio() {
    if (this.precio < 0) {
      this.mensajeError = 'El precio no puede ser negativo';
    } else {
      this.mensajeError = ''; 
    }
  }

  
}
