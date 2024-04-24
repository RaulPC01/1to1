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
  showConfirmation: boolean = false; // Variable para mostrar el mensaje de confirmación

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Configurar el formulario y obtener motivos al iniciar el componente
    this.tiketform = this.formBuilder.group({
      idUser: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      motius: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
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
  
        const userId = this.user.dni;
        console.log('Valor de userId:', userId);
        this.tiketform.patchValue({
          idUser: userId
        });
      
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }
  submitForm() {
    if (this.tiketform.valid) {
      if (!this.tiketform.value.idUser) {
        console.error('El campo idUser es requerido');
        return;
      }

  
      this.http.post<any>('http://localhost:8000/api/create-tiket', this.tiketform.value)
        .subscribe(
          (data) => {
            console.log('Respuesta del servidor:', data);
            this.showConfirmation = true; // Mostrar el mensaje de confirmación
            setTimeout(() => {
              this.showConfirmation = false; // Ocultar el mensaje de confirmación después de 4 segundos
            }, 4000); // Tiempo en milisegundos (en este caso, 4 segundos)
            this.tiketform.reset(); // Restablecer los valores del formulario
          },
          (error: HttpErrorResponse) => {
            console.error('Error al enviar el formulario:', error);
            this.router.navigate(['/contacto']); 
          }
        );
    } else {
      console.error('El formulario no es válido');
    }
  }

}
