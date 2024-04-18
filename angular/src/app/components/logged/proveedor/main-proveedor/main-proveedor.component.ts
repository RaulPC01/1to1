import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-proveedor',
  templateUrl: './main-proveedor.component.html',
  styleUrls: ['./main-proveedor.component.css']
})
export class MainProveedorComponent implements OnInit {
  nuevoServicio = { nombre: '' };
  servicios = [{ nombre: 'Ejemplo de Servicio' }];

  constructor() { }

  ngOnInit(): void {
  }

  crearServicio() {
    this.servicios.push({...this.nuevoServicio});
    this.nuevoServicio.nombre = ''; // Reset the form
  }

  editarServicio(servicio: any) {
    // Agregar la lógica de edición aquí
  }

  eliminarServicio(servicio: any) {
    const index = this.servicios.indexOf(servicio);
    if (index > -1) {
      this.servicios.splice(index, 1);
    }
  }
}
