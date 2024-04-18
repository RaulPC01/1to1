import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearservico',
  templateUrl: './crearservico.component.html',
  styleUrls: ['./crearservico.component.css']
})
export class CrearservicoComponent implements OnInit {
  mostrarCategoria: boolean = true;
  mostrarNombre: boolean = false;
  mostrarDescripcion: boolean = false;
  mostrarTarifa: boolean = false;
  mostrarPoblacion: boolean = false;
  mostrarImagen: boolean = false;
  servicioForm!: FormGroup; // Declaración del FormGroup
  user: any; // Variable para almacenar los datos del perfil del usuario
  categorias: any[] = []; 
  poblaciones: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario FormGroup
    this.servicioForm = this.formBuilder.group({
      idUser: ['', Validators.required],
      categoria: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      poblacion: ['', Validators.required],
      
    });


    
    // Obtener los datos del perfil del usuario al iniciar el componente
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error adecuadamente, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }

    this.obtenerCategorias();
    this.obtenerPoblaciones();
  }

  obtenerCategorias(): void {
    this.http.get<any[]>('http://localhost:8000/api/categories').subscribe(
      (categorias) => {
        console.log('Categorías:', categorias);
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  obtenerPoblaciones(): void {
    this.http.get<any[]>('http://localhost:8000/api/poblaciones').subscribe(
      (poblaciones) => {
        console.log('Poblaciones:', poblaciones);
        this.poblaciones = poblaciones;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  obtenerPerfilUsuario(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        this.user = data;
  
        // Convertir el dni a un entero y establecerlo en el formulario
        const userId = this.user.dni;
        console.log('Valor de userId:', userId); // Verificar el valor de userId
        this.servicioForm.patchValue({
          idUser: userId
        });
      
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  submitForm() {
    if (this.servicioForm.valid) {
      // Verificar que el campo idUser tenga un valor
      if (!this.servicioForm.value.idUser) {
        console.error('El campo idUser es requerido');
        return;
      }
  
      // Enviar los datos del formulario al backend
      this.http.post<any>('http://localhost:8000/api/crear-servicio', this.servicioForm.value)
        .subscribe(
          (data) => {
            // Manejar la respuesta del backend si es necesario
            console.log('Respuesta del servidor:', data);
            // Redirigir al usuario a otra página, mostrar mensaje de éxito, etc.
          },
          (error: HttpErrorResponse) => {
            console.error('Error al enviar el formulario:', error);
            // Manejar errores en caso de que la solicitud falle
            // Redirigir al usuario a la página de inicio o mostrar un mensaje de error
            this.router.navigate(['/']); 
          }
        );
    } else {
      console.error('El formulario no es válido');
      // El formulario no es válido, manejar el caso según tus necesidades
    }
  }
  volverCategoria() {
    this.mostrarNombre = false;
    this.mostrarCategoria = true;
  }

  verNombreServicio() {
    this.mostrarCategoria = false;
    this.mostrarNombre = true;
  }

  volverNombreServicio(){
    this.mostrarDescripcion = false;
    this.mostrarNombre = true;
  }

  verDescripcion() {
    this.mostrarNombre = false;
    this.mostrarDescripcion = true;
  }

  volverDescripcion(){
    this.mostrarTarifa = false;
    this.mostrarDescripcion = true;
  }

  verTarifa() {
    this.mostrarDescripcion = false;
    this.mostrarTarifa = true;
  }

  volverTarifa(){
    this.mostrarPoblacion = false;
    this.mostrarTarifa = true;
  }

  verPoblacion() {
    this.mostrarTarifa = false;
    this.mostrarPoblacion = true;
  }

  volverPoblacion(){
    this.mostrarImagen = false;
    this.mostrarPoblacion = true;
  }

  verImagen() {
    this.mostrarPoblacion = false;
    this.mostrarImagen = true;
  }
}
