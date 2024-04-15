import { Component } from '@angular/core';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-main-proveedor',
  templateUrl: './main-proveedor.component.html',
  styleUrls: ['./main-proveedor.component.css']
})
export class MainProveedorComponent {
  mostrarDatosPersonales: boolean = true;
  mostrarDireccion: boolean = false;
  mostrarContacto: boolean = false;
  mostrarColegiado: boolean = false;
  mostrarTitulacion: boolean = false;
  mostrarExperiencia: boolean = false;
  mostrarPagosDevoluciones: boolean = false;
  mostrarOpciones: boolean = false;


  id_usuario_proveedor= this.tokeService.DNIuser;

  registro: any = {};
 

  constructor(public tokeService: TokenService) { 

    console.log(this.id_usuario_proveedor);
  }

  submitForm() {
    // Aquí iría la lógica para enviar el formulario
  }

  verDireccion() {
    this.mostrarDatosPersonales = false;
    this.mostrarDireccion = true;
  }

  verContacto() {
    this.mostrarDireccion = false;
    this.mostrarContacto = true;
  }

  verColegiado() {
    this.mostrarContacto = false;
    this.mostrarColegiado = true;
  }

  verTitulacion() {
    this.mostrarColegiado = false;
    this.mostrarTitulacion = true;
  }

  verExperiencia() {
    this.mostrarTitulacion = false;
    this.mostrarExperiencia = true;
  }

  verPagosDevoluciones() {
    this.mostrarExperiencia = false;
    this.mostrarPagosDevoluciones = true;
  }

  verOpciones() {
    this.mostrarPagosDevoluciones = false;
    this.mostrarOpciones = true;
  }

  verAnteriorDatosPersonales() {
    this.mostrarDireccion = false;
    this.mostrarDatosPersonales = true;
  }

  verAnteriorDireccion() {
    this.mostrarContacto = false;
    this.mostrarDireccion = true;
  }

  verAnteriorContacto() {
    this.mostrarColegiado = false;
    this.mostrarContacto = true;
  }

  verAnteriorColegiado() {
    this.mostrarTitulacion = false;
    this.mostrarColegiado = true;
  }

  verAnteriorTitulacion() {
    this.mostrarExperiencia = false;
    this.mostrarTitulacion = true;
  }

  verAnteriorExperiencia() {
    this.mostrarPagosDevoluciones = false;
    this.mostrarExperiencia = true;
  }

  verAnteriorPagosDevoluciones() {
    this.mostrarOpciones = false;
    this.mostrarPagosDevoluciones = true;
  }


}

