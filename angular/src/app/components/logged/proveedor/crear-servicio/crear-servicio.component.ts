import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent {
  mostrarCategoria: boolean = true;
  mostrarNombre: boolean = false;
  mostrarDescripcion: boolean = false;
  mostrarTarifa: boolean = false;
  mostrarPoblacion: boolean = false;
  mostrarImagen: boolean = false;

  registro: any = {};

  constructor() { }

  submitForm() {
    // Aquí iría la lógica para enviar el formulario
  }

  volverCategoria(){
    this.mostrarNombre = false;
    this.mostrarCategoria = true;
  }

  //----------NOMBRE SERVICIO------------\\
  verNombreServicio() {
    this.mostrarCategoria = false;
    this.mostrarNombre = true;
  }

  volverNombreServicio(){
    this.mostrarDescripcion = false;
    this.mostrarNombre = true;
  }

  //----------DESCRIPCION------------\\
  verDescripcion() {
    this.mostrarNombre = false;
    this.mostrarDescripcion = true;
  }

  volverDescripcion(){
    this.mostrarTarifa = false;
    this.mostrarDescripcion = true;
  }

  //----------TARIFA------------\\
  verTarifa() {
    this.mostrarDescripcion = false;
    this.mostrarTarifa = true;
  }

  volverTarifa(){
    this.mostrarPoblacion = false;
    this.mostrarTarifa = true;
  }

  //----------DESCRIPCION------------\\
  verPoblacion() {
    this.mostrarTarifa = false;
    this.mostrarPoblacion = true;
  }

  volverPoblacion(){
    this.mostrarImagen = false;
    this.mostrarPoblacion = true;
  }

  //----------Imagen------------\\
  verImagen() {
    this.mostrarPoblacion = false;
    this.mostrarImagen = true;
  }

}
