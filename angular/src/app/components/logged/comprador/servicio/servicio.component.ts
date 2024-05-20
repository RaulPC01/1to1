import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from 'src/app/servicio.service';
import { UserService } from 'src/app/user.service';

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
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loading = true; 
    this.mensajeForm = this.formBuilder.group({
      IdUsuarioComentario: ['', Validators.required],
      Nombre_user: ['', Validators.required],
      mensage: ['', Validators.required],
      id_Servicio: ['', Validators.required],
    });

    // obtiene los parametros de la ruta
    this.route.paramMap.subscribe(params => {
      const servicioId = params.get('id_servicios');
      if (servicioId) {
        this.obtenerDetalleServicio(servicioId);
        this.obtenerComentarios(servicioId);
      }
    });

    // obtiene el token del almacenamiento local
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('el token no esta definido en el almacenamiento local');
      // manejar el error adecuadamente, por ejemplo, redirigir al usuario a la pagina de inicio de sesion
    }
  }

  // obtiene el perfil del usuario actualmente logueado
  obtenerPerfilUsuario(token: string): void {
    this.userService.obtenerPerfilUsuario(token).subscribe(
      (data) => {
        this.user = data;
        this.mensajeForm.patchValue({
          IdUsuarioComentario: this.user.dni,
          Nombre_user: this.user.name
        });
        console.log('datos del usuario obtenidos:', this.user);
      },
      (error) => {
        console.error('error al obtener el perfil del usuario:', error);
      }
    );
  }

  // obtiene los detalles del servicio mediante su id
  obtenerDetalleServicio(id_servicios: string): void {
    this.servicioService.obtenerDetalleServicio(id_servicios).subscribe(
      (data) => {   
        console.log('json retornado por la api:', data);
        this.servicio = data;
        if (this.servicio && this.servicio.id_servicios) {
          this.mensajeForm.patchValue({
            id_Servicio: this.servicio.id_servicios.toString(),
          });
        } else {
          console.error('no se pudo obtener el id del servicio correctamente');
        }
        if (this.servicio && this.servicio.user && this.servicio.user.dateOfBirth) {
          const fechaNacimiento = new Date(this.servicio.user.dateOfBirth);
          const hoy = new Date();
          const diff = hoy.getTime() - fechaNacimiento.getTime();
          this.edadUsuario = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
      },
      (error) => {
        console.error('error al obtener los detalles del servicio: ', error);
      }
    );
  }

  // obtiene los comentarios del servicio
  obtenerComentarios(id_servicios: string): void {
    this.servicioService.obtenerComentarios(id_servicios).subscribe(
      (data) => {   
        this.loading = false; 
        console.log('comentarios obtenidos:', data);
        this.comentarios = data.comentarios;
      },
      (error) => {
        console.error('error al obtener los comentarios: ', error);
        this.loading = false; 
      }
    );
  }

  // alterna la visibilidad de la imagen completa
  toggleImagenCompleta() {
    this.mostrarCompleta = !this.mostrarCompleta;
  }

  // envia el comentario
  enviarComentario() {
    if (this.mensajeForm.valid) {
      console.log('datos del comentario a enviar:', this.mensajeForm.value);
      this.servicioService.enviarComentario(this.mensajeForm.value).subscribe(
        (response) => {
          console.log('comentario enviado correctamente:', response);
          this.mensajeForm.reset();
          this.mostrarInputComentario = false;
          window.location.reload();
        },
        (error) => {
          console.error('error al enviar el comentario:', error);
        }
      );
    } else {
      console.log(this.mensajeForm.value);
    }
  }
}
