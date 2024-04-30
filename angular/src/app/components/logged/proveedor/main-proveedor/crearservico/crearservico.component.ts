import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/servicio.service';
import { UserService } from 'src/app/user.service';
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
  servicioForm!: FormGroup; 
  user: any; 
  categorias: any[] = []; 
  poblaciones: any[] = [];
  showConfirmation: boolean = false;
  nombreLength: number  =0;
  descripcionLength: number =0;

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private UserService : UserService,
  ) {}

  countNombreLength(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 40) {
      input.value = input.value.slice(0, 40); // Limitar la longitud a 40 caracteres
      this.servicioForm.get('nombre')?.setValue(input.value); // Actualizar el valor en el formulario
    }
    this.nombreLength = input.value.length;
  }
  countDescripcionLength(event: any): void {
    const input = event.target as HTMLTextAreaElement;
    if (input.value.length > 200) {
      input.value = input.value.slice(0, 200); // Limitar la longitud a 200 caracteres
      this.servicioForm.get('descripcion')?.setValue(input.value); // Actualizar el valor en el formulario
    }
    this.descripcionLength = input.value.length;
  }

  ngOnInit(): void {
    // Inicializar el formulario FormGroup
    this.servicioForm = this.formBuilder.group({
      idUser: ['', Validators.required],
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
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
    this.servicioService.obtenerCategorias().subscribe(
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
    this.servicioService.obtenerPoblaciones().subscribe(
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
    this.UserService.obtenerPerfilUsuario(token).subscribe(
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
      this.servicioService.crearServicio(this.servicioForm.value).subscribe(
        (data) => {
          // Manejar la respuesta del backend si es necesario
          console.log('Respuesta del servidor:', data);
          this.showConfirmation = true; // Mostrar el mensaje de confirmación
          setTimeout(() => {
            this.showConfirmation = false; // Ocultar el mensaje de confirmación después de 4 segundos
            this.router.navigate(['/home-comprador']);

          }, 4000); // Tiempo en milisegundos (en este caso, 4 segundos)
          this.servicioForm.reset(); // Restablecer los valores del formulario
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


