import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa las clases necesarias para manejar formularios reactivos

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  userId!: string | null;
  perfilForm!: FormGroup; // Declara una propiedad para el formulario FormGroup

  constructor(public authService: AuthService, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('Idtoken');
    if (this.userId) {
      this.obtenerPerfilUsuario(this.userId);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }

    // Inicializa el formulario FormGroup
    this.perfilForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  obtenerPerfilUsuario(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        console.log(data);
        this.user = data;
        if (localStorage.getItem('Idtoken') !== data.token) {
          console.error('El token almacenado en el navegador no coincide con el token devuelto por el backend');
          this.authService.cerrarSesion();
        }

        // Establece los valores del formulario
        this.perfilForm.patchValue({
          dni: this.user.dni,
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
          dateOfBirth: this.user.dateOfBirth
        });
      },
      (error) => {
        console.error('Error al obtener los detalles del perfil:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}
