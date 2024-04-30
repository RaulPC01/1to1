import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contratar-servicio',
  templateUrl: './contratar-servicio.component.html',
  styleUrls: ['./contratar-servicio.component.css']
})
export class ContratarServicioComponent implements OnInit {
  mostrarDescripcion: boolean = true;
  mostrarDate: boolean = false;
  servicioForm!: FormGroup;
  user: any;
  userProv: any;
  showConfirmation: boolean = false;
  nombreLength: number = 0;
  descripcionLength: number = 0;
  servicio: any;
  mostrarDialogo: boolean = false;
  dateInvalid: boolean = false;
  acceptado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.servicioForm = new FormGroup({
      descripcion: new FormControl(''),
      date_servicio: new FormControl('')
    });
  }
// Inicializa el componente y configura el formulario con valores por defecto.
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const servicioId = params.get('id_servicio');
      console.log('ID del servicio:', servicioId);

      // Inicializar el formulario FormGroup
      this.servicioForm = this.formBuilder.group({
        id_user: ['', Validators.required], // Cambiado a 'id_user'
        id_servicio: [servicioId, Validators.required], // Asignar el servicioId obtenido de la URL
        id_user_proveedor: ['', Validators.required],
        descripcion: ['', Validators.required],
        date_servicio: ['', Validators.required],
        telefono_user: ['', Validators.required],
        accepted: [this.acceptado], // Establecer accepted en false por defecto
      });

      // Obtener los datos del perfil del usuario al iniciar el componente
      const token = localStorage.getItem('Idtoken');
      if (token) {
        this.obtenerPerfilUsuario(token);
      } else {
        console.error('El token no está definido en el almacenamiento local');
        // Manejar el error adecuadamente, por ejemplo, redirigir al usuario a la página de inicio de sesión
      }
    });
  }

  // cerrar dialogo de pago
  cerrarDialogo() {
    this.mostrarDialogo = false;
  }

  // combrobacion de la fecha del servicio para que no pueda ser inferior a la actual
  checkDate() {
    const dateControl = this.servicioForm.get('date_servicio');

    if (dateControl && dateControl.value) {
      const selectedDate = new Date(dateControl.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Ajustar la hora a medianoche para comparar solo las fechas

      // Comprobar si la fecha seleccionada es anterior a la fecha actual
      this.dateInvalid = selectedDate < currentDate;
    } else {
      // Manejar el caso en que no se ha seleccionado una fecha o el control es nulo
      this.dateInvalid = true; // O definirlo como false según la lógica deseada
    }
  }

  // mensaje de proceso de pago
  procesarPago() {
    this.cerrarDialogo();
    console.log('Procesando pago...');
    setTimeout(() => {
      alert('Pago realizado con éxito!');
    }, 2000);
  }

  getUserByServiceId(idServicio: string): void {
    // Construir la URL de la solicitud
    const url = `http://localhost:8000/api/services/${idServicio}/user`;

    // Realizar la solicitud HTTP GET
    this.http.get<any>(url).subscribe(
      (data) => {
        // Manejar la respuesta exitosa
        console.log('Datos del usuario:', data);

        this.userProv = data;

        const userPorvId = this.userProv.dni;

        this.servicioForm.patchValue({
          id_user_proveedor: userPorvId, // Asignar el dni del usuario proveedor al campo id_user_proveedor

        });
        // Aquí puedes implementar la lógica para manejar los datos del usuario
      },
      (error: HttpErrorResponse) => {
        // Manejar el error
        console.error('Error al obtener el usuario:', error);
        // Aquí puedes implementar la lógica para manejar el error, como mostrar un mensaje al usuario
      }
    );
}
// funcion para obtener el perfil del usuario
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
        const telefono = this.user.phone;

        console.log('Valor de userId:', userId); // Verificar el valor de userId
        this.servicioForm.patchValue({
          id_user: userId, // Cambiado a 'id_user'
          telefono_user: telefono,
        });

        // Obtener el ID del usuario proveedor después de obtener el perfil del usuario
        const id_user_proveedor = this.user.id; // Aquí debe ser la propiedad correcta del usuario que representa el proveedor
        if (id_user_proveedor) {
          this.getUserByServiceId(id_user_proveedor);
        } else {
          console.error('El user_proveedor_id no está definido');
          // Manejar el error adecuadamente, por ejemplo, redirigir al usuario a la página de inicio de sesión
        }
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  submitForm() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Otros encabezados si son necesarios
      }),
      withCredentials: true // Permitir el envío de cookies de autenticación
    };

    // Console log de los datos del formulario antes de enviarlo al backend
    console.log('Datos del formulario:', this.servicioForm.value);

    // Enviar los datos del formulario al backend
    this.http.post<any>('http://localhost:8000/api/crearSolicitud', this.servicioForm.value)
      .subscribe(
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
  }

  //funcion para ver la descripcion
  verDescripcion() {
    this.mostrarDescripcion = true;
    this.mostrarDate = false;
  }
//funcion para ver la fecha
  verDate() {
    this.mostrarDescripcion = false;
    this.mostrarDate = true;
  }
//funcion para pasar a la vista anterior que en este caso es la descripcion
  anteriorDescripcion() {
    this.mostrarDate = false;
    this.mostrarDescripcion = true;
  }

  // contador para ver cuantos digitos hay en el campo de la descripcion
  countDescripcionLength(event: any): void {
    const input = event.target as HTMLTextAreaElement;
    if (input.value.length > 200) {
      input.value = input.value.slice(0, 200); // Limitar la longitud a 200 caracteres
      this.servicioForm.get('descripcion')?.setValue(input.value); // Actualizar el valor en el formulario
    }
    this.descripcionLength = input.value.length;
  }
}