import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ServicioService } from 'src/app/servicio.service';

// funcion validadora para asegurar que una fecha este dentro de un rango especificado
function dateRangeValidator(minDate: Date, maxDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = new Date(control.value);
    if (!control.value || date < minDate || date > maxDate) {
      return { 'dateRange': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-contratar-servicio',
  templateUrl: './contratar-servicio.component.html',
  styleUrls: ['./contratar-servicio.component.css']
})
export class ContratarServicioComponent implements OnInit {
  mostrarDescripcion: boolean = true;
  mostrarDate: boolean = false;
  mostrarMetodoPago = false;
  servicioForm!: FormGroup;
  user: any;
  userProv: any;
  showConfirmation: boolean = false;
  nombreLength: number = 0;
  descripcionLength: number = 0;
  servicio: any;
  acceptado: boolean = false;

  minDate: string | undefined;
  maxDate: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = nextYear.toISOString().split('T')[0];

    this.route.paramMap.subscribe(params => {
      const servicioId = params.get('id_servicio');

      // inicializacion del formulario con validaciones y campos requeridos
      this.servicioForm = this.formBuilder.group({
        id_user: ['', Validators.required],
        id_servicio: [servicioId, Validators.required],
        id_user_proveedor: ['', Validators.required],
        nombre_Servicio: ['', Validators.required],
        name_user_solicitud: ['', Validators.required],
        descripcion: ['', Validators.required],
        date_servicio: ['', [Validators.required, dateRangeValidator(today, nextYear)]],
        telefono_user: ['', Validators.required],
        accepted: [this.acceptado],
        numero_tarjeta: ['', Validators.required],
  mes_caducidad: ['', Validators.required],
  anyo_caducidad: ['', Validators.required],
  CVV: ['', Validators.required],
  nombre_tarjeta: ['', Validators.required],
      });

      const token = localStorage.getItem('Idtoken');
      if (token && servicioId) {
        this.obtenerPerfilUsuario(token, servicioId);
        this.obtenerDetalleServicio(servicioId);
      } else {
        console.error('el token o el id del servicio no esta disponible.');
      }
    });
  }

  // funcion para obtener detalles de un servicio especifico mediante su id
  obtenerDetalleServicio(id_servicios: string): void {
    this.servicioService.obtenerDetalleServicio(id_servicios).subscribe(
      (data) => {
        console.log('json retornado por la api:', data);
        this.servicio = data;
        if (this.servicio && this.servicio.id_servicios) {
          this.servicioForm.patchValue({
            nombre_Servicio: this.servicio.tipo_servicio
          });
        } else {
          console.error('no se pudo obtener el id del servicio correctamente');
        }
      },
      (error) => {
        console.error('error al obtener los detalles del servicio:', error);
      }
    );
  }

  // funcion para obtener el perfil del usuario actualmente logueado
  obtenerPerfilUsuario(token: string, servicioId: string): void {
    this.userService.obtenerPerfilUsuario(token).subscribe(
      (data) => {
        console.log('datos del usuario loggeado:', data);
        this.user = data;
        const userId = this.user.dni;
        const telefono = this.user.phone;
        const nombreUser = this.user.name;
        this.servicioForm.patchValue({
          id_user: userId,
          telefono_user: telefono,
          name_user_solicitud: nombreUser
        });
        this.getUserByServiceId(servicioId);
      },
      (error) => {
        console.error('error al obtener el perfil del usuario:', error);
      }
    );
  }

  // funcion para obtener el usuario proveedor del servicio
  getUserByServiceId(servicioId: string): void {
    this.userService.getUserByServiceId(servicioId).subscribe(
      (data) => {
        console.log('datos del usuario del servicio:', data);
        this.userProv = data;
        this.servicioForm.patchValue({
          id_user_proveedor: this.userProv.dni.toString()
        });
      },
      (error: HttpErrorResponse) => {
        console.error('error al obtener el usuario:', error);
      }
    );
  }

  // funcion para enviar el formulario y procesar la solicitud del servicio
  submitForm() {
    console.log('datos del formulario:', this.servicioForm.value);
    if (this.servicioForm.valid) {
      // Enviar el formulario con todos los campos, incluidos los de método de pago
      this.servicioService.enviarSolicitud(this.servicioForm.value).subscribe(
        data => {
          console.log('respuesta del servidor:', data);
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
            this.router.navigate(['/home-comprador']);
          }, 4000);
          this.servicioForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error('error al enviar el formulario:', error);
        }
      );
    } else {
      console.error('el formulario no es valido');
    }
  }

  // metodos para gestionar la visualizacion de diferentes secciones del formulario
  verDescripcion() {
    this.mostrarDescripcion = true;
    this.mostrarDate = false;
  }

  verDate() {
    this.mostrarDescripcion = false;
    this.mostrarDate = true;
  }

  anteriorDescripcion() {
    this.mostrarDate = false;
    this.mostrarDescripcion = true;
  }

  verMetodoPago() {
    this.mostrarDescripcion = false;
    this.mostrarDate = false;
    this.mostrarMetodoPago = true;
  }

  anteriorDate() {
    this.mostrarDescripcion = true;
    this.mostrarDate = false;
    this.mostrarMetodoPago = false;
  }

  // funcion para controlar la longitud de la descripcion ingresada por el usuario
  countDescripcionLength(event: any): void {
    const input = event.target as HTMLTextAreaElement;
    if (input.value.length > 200) {
      input.value = input.value.slice(0, 200); // limitar la longitud a 200 caracteres
      this.servicioForm.get('descripcion')?.setValue(input.value); // actualizar el valor en el formulario
    }
    this.descripcionLength = input.value.length;
  }
}
