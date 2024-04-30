import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { TicketsService } from 'src/app/tikets.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  tiketform!: FormGroup;
  motivos: any[] = [];
  user: any; 
  showConfirmation: boolean = false; // Variable para mostrar el mensaje de confirmación

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    // Configurar el formulario y obtener motivos al iniciar el componente
    this.tiketform = this.formBuilder.group({
      idUser: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      motivo: ['', Validators.required],
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
    this.ticketsService.getMotivos().subscribe(
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
    this.userService.obtenerPerfilUsuario(token).subscribe(
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
      this.ticketsService.crearTicket(this.tiketform.value)
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
