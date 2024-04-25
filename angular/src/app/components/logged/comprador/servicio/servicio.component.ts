import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  servicio: any;
  edadUsuario: number | undefined;
  mostrarCompleta = false;
  loading: boolean = false;
  mostrarInputComentario: boolean = false;
  user: any;
  mensajeForm!: FormGroup;
  comentarios: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.loading = true; 
    // Inicializar el formulario
    this.mensajeForm = this.formBuilder.group({
      IdUsuarioComentario: ['', Validators.required],
      Nombre_user: ['', Validators.required],
      mensage: ['', Validators.required],
      id_Servicio: ['', Validators.required], // Cambiado a string
    });

    // Obtener el detalle del servicio al iniciar el componente
    this.route.paramMap.subscribe(params => {
      const servicioId = params.get('id_servicios');
      if (servicioId) {

        this.obtenerDetalleServicio(servicioId);
        this.obtenerComentarios(servicioId);
        
      }
    });

    // Obtener el perfil del usuario al iniciar el componente
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error adecuadamente, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }
  }

  obtenerPerfilUsuario(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        this.user = data;
      
  
        // Establecer valores en el formulario
        this.mensajeForm.patchValue({
          IdUsuarioComentario: this.user.dni,
          Nombre_user: this.user.name
        });
  
        // Mostrar los datos del usuario obtenidos
        console.log('Datos del usuario obtenidos:', this.user);
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
         
      }
    );
  }

  obtenerDetalleServicio(id_servicios: string): void {
    this.http.get<any>(`http://localhost:8000/api/services/${id_servicios}`).subscribe(
      (data) => {   
        console.log('JSON retornado por la API:', data);
        
        this.servicio = data;

        if (this.servicio && this.servicio.id_servicios) {
          this.mensajeForm.patchValue({
            id_Servicio: this.servicio.id_servicios.toString(), // Cambiado a string
          });
        } else {
          console.error('No se pudo obtener el id del servicio correctamente');
        }

        if (this.servicio && this.servicio.user && this.servicio.user.dateOfBirth) {
          const fechaNacimiento = new Date(this.servicio.user.dateOfBirth);
          const hoy = new Date();
          const diff = hoy.getTime() - fechaNacimiento.getTime();
          this.edadUsuario = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
      },
      (error) => {
        console.error('Error al obtener los detalles del servicio: ', error);
        
      }
    );
  }

  obtenerComentarios(id_servicios: string): void {
    this.http.get<any>(`http://localhost:8000/api/servicios/${id_servicios}/comentarios`).subscribe(
      (data) => {   
        this.loading = false; 
        console.log('Comentarios obtenidos:', data);
        this.comentarios = data.comentarios; // Asignación de los comentarios
      },
      (error) => {
        console.error('Error al obtener los comentarios: ', error);
        this.loading = false; 
      }
    );
  }
  

  toggleImagenCompleta() {
    this.mostrarCompleta = !this.mostrarCompleta;
  }

  enviarComentario() {
    if (this.mensajeForm.valid) {
      console.log('Datos del comentario a enviar:', this.mensajeForm.value);
  
      this.http.post<any>('http://localhost:8000/api/resena', this.mensajeForm.value).subscribe(
        (response) => {
          console.log('Comentario enviado correctamente:', response);
          this.mensajeForm.reset();
          this.mostrarInputComentario = false;
          window.location.reload();
        },
        (error) => {
          console.error('Error al enviar el comentario:', error);
        }
      );
    } else {
      console.log(this.mensajeForm.value);
    }
  }
}
