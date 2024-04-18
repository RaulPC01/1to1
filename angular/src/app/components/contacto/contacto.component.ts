import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  tiketform!: FormGroup;
  motivos: any[] = [];
  user: any; 
 

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {


    this.tiketform = this.formBuilder.group({
      idUser: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      motius: ['', Validators.required],
      descripcion: ['', Validators.required],
     
      
    });

    // Obtener los datos del perfil del usuario al iniciar el componente
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error adecuadamente, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }

    this.obtenerMotivos();
    
  }
  obtenerMotivos(): void {
    this.http.get<any[]>('http://localhost:8000/api/motivos').subscribe(
      (motivos) => {
        console.log('motivos:', motivos);
        this.motivos = motivos;
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
        this.tiketform.patchValue({
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
    if (this.tiketform.valid) {
      // Verificar que el campo idUser tenga un valor
      if (!this.tiketform.value.idUser) {
        console.error('El campo idUser es requerido');
        return;
      }
  
      // Enviar los datos del formulario al backend
      this.http.post<any>('http://localhost:8000/api/create-tiket', this.tiketform.value)
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
            this.router.navigate(['/contacto']); 
          }
        );
    } else {
      console.error('El formulario no es válido');
      // El formulario no es válido, manejar el caso según tus necesidades
    }
  }
}
