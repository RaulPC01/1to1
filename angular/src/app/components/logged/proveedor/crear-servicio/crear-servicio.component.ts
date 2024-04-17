import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Servicio } from 'src/app/models/servicio.model';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {
  mostrarCategoria: boolean = true;
  mostrarNombre: boolean = false;
  mostrarDescripcion: boolean = false;
  mostrarTarifa: boolean = false;
  mostrarPoblacion: boolean = false;
  mostrarImagen: boolean = false;

  registro: any = {};

  ngOnInit(): void {
    this.mostrarCategoria = true;
    this.mostrarNombre = false;
    this.mostrarDescripcion = false;
    this.mostrarTarifa = false;
    this.mostrarPoblacion = false;
    this.mostrarImagen = false;
  }

  //----------------------------FORMLARIO SERVICIO----------------------------//
  @Output() nuevaServicioEvent: EventEmitter<Servicio> = new EventEmitter<Servicio>();
  @Output() EnviarFormulario = new EventEmitter<void>();
  
  servicioForm!: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.servicioForm = this.fb.group({
      categoria: new FormControl('', [Validators.required]),
      nombre_servicio: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      tarifa: new FormControl('', [Validators.required]),
      poblacion: new FormControl('', [Validators.required]),
      imagen: new FormControl('')
    })
  }

  guardarServicio(){
    
  }
  



  //---------------------------CAMBIO DEL CONTENIDO---------------------------//
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
