import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegisterForm: FormGroup;
  errorMessage: string = '';
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.RegisterForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      image: [''] // Eliminamos Validators.required aquí para permitir que el usuario seleccione la imagen opcionalmente
    });
  }

  onSubmit(): void {
    if (this.RegisterForm.valid) {
      const formData = new FormData();

      formData.append('dni', this.RegisterForm.value.dni);
      formData.append('name', this.RegisterForm.value.name);
      formData.append('dateOfBirth', this.RegisterForm.value.dateOfBirth);
      formData.append('email', this.RegisterForm.value.email);
      formData.append('phone', this.RegisterForm.value.phone);
      formData.append('password', this.RegisterForm.value.password);
      formData.append('password_confirmation', this.RegisterForm.value.password_confirmation);
      formData.append('image', this.RegisterForm.value.image);
      

      this.http.post<any>('http://localhost:8000/api/register', formData)
        .subscribe(
          (data) => {
            // Manejar la respuesta del backend si es necesario
          },
          (error: HttpErrorResponse) => {
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.';
            }
            this.router.navigate(['/login']);
          }
        );
    } else {
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
    }
  }
}
