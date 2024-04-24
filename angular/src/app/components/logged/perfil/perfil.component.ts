import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  perfilForm!: FormGroup;
  showEditForm: boolean = false;

  constructor(
    private http: HttpClient,
    private TokenService: TokenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Inicializa el formulario FormGroup
    this.perfilForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });

    // Llama a la función para obtener el perfil del usuario
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }
  }


  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
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
        if (localStorage.getItem('Idtoken') === data.token) {
          console.error('El token almacenado en el navegador coincide con el token devuelto por el backend');
          this.TokenService.cerrarSesion();
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
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}