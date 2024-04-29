import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  acceptado: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const servicioId = params.get('id_servicio');
      console.log('ID del servicio:', servicioId);
  
      // Inicializar el formulario FormGroup
      this.servicioForm = this.formBuilder.group({
        id_user: ['', Validators.required], // Cambiado a 'id_user'
        id_servicio: [servicioId, Validators.required], // Asignar el servicioId obtenido de la URL
        id_user_proveedor: ['', Validators.required],
        nombre_Servicio: ['', Validators.required],
        name_user_solicitud: ['', Validators.required],
        descripcion: ['', Validators.required],
        date_servicio: ['', Validators.required],
        telefono_user: ['', Validators.required],
        accepted: [this.acceptado], // Establecer accepted en false por defecto
      });
  
      // Obtener los datos del perfil del usuario al iniciar el componente
      const token = localStorage.getItem('Idtoken');
      if (token && servicioId !== null) {
        this.obtenerPerfilUsuario(token, servicioId);
        this. obtenerDetalleServicio(servicioId); // Pasar servicioId aquí
      } else {
        console.error('El token no está definido en el almacenamiento local o servicioId es null');
        // Manejar el error adecuadamente, por ejemplo, redirigir al usuario a la página de inicio de sesión
      }
    });
  }
  
  obtenerDetalleServicio(id_servicios: string): void {
    this.http.get<any>(`http://localhost:8000/api/services/${id_servicios}`).subscribe(
      (data) => {   
        console.log('JSON retornado por la API:', data);
        
        this.servicio = data;
          const nomServicio = this.servicio.tipo_servicio;
        if (this.servicio && this.servicio.id_servicios) {
          this.servicioForm.patchValue({
            nombre_Servicio: nomServicio,
          });
        } else {
          console.error('No se pudo obtener el id del servicio correctamente');
        }

      },
      (error) => {
        console.error('Error al obtener los detalles del servicio: ', error);
        
      }
    );
  }

  obtenerPerfilUsuario(token: string, servicioId: string): void { // Agregar servicioId como parámetro
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('Datos del usuario loggeado:', data);
        this.user = data;
  
        // Convertir el dni a un entero y establecerlo en el formulario
        const userId = this.user.dni;
        const telefono = this.user.phone;
        const nombreUser = this.user.name;
        
        console.log('Valor de userId:', userId);
        this.servicioForm.patchValue({
          id_user: userId,
          telefono_user: telefono,
          name_user_solicitud:nombreUser,
        });
  
        // Pasar servicioId a getUserByServiceId
        if (servicioId) {
          this.getUserByServiceId(servicioId); // Corregir aquí
        } else {
          console.error('El servicioId no está definido');
        }
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }
  
  
  
  getUserByServiceId(servicioId: string): void {
    // Construir la URL de la solicitud
    const url = `http://localhost:8000/api/services/${servicioId}/user`;
    console.log('ID DEL SERVICIO:', servicioId);
  
    // Realizar la solicitud HTTP GET
    this.http.get<any>(url).subscribe(
      (data) => {
        // Manejar la respuesta exitosa
        console.log('Datos del usuario del servicio:', data);
  
        // Utilizar el ID del usuario proveedor del servicio
        const userProvId = data.dni.toString(); // Convertir a cadena de texto
  
        this.servicioForm.patchValue({
          id_user_proveedor: userProvId, // Asignar el ID del usuario proveedor al campo id_user_proveedor
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

  countDescripcionLength(event: any): void {
    const input = event.target as HTMLTextAreaElement;
    if (input.value.length > 200) {
      input.value = input.value.slice(0, 200); // Limitar la longitud a 200 caracteres
      this.servicioForm.get('descripcion')?.setValue(input.value); // Actualizar el valor en el formulario
    }
    this.descripcionLength = input.value.length;
  }
}
