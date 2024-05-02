import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
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
    private http: HttpClient,
    private userService: UserService,
    private Router: Router
  ) {
    this.RegisterForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required], // Agregado para confirmar la contraseña
      image: [null] // Campo para la imagen
    }, {
      validators: this.passwordMatchValidator // Validación personalizada para las contraseñas
    });
  }

  // Función para validar que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;

    if (password !== confirmPassword) {
      formGroup.get('password_confirmation')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      formGroup.get('password_confirmation')?.setErrors(null);
      return null;
    }
  }

  // Método para mostrar mensajes de error
  showError(controlName: string, errorName: string) {
    return this.RegisterForm.controls[controlName].hasError(errorName);
  }
  
  // Maneja la selección de archivos
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.getBase64(file).then((base64: string) => {
        this.RegisterForm.patchValue({
          image: base64 // Almacena la imagen codificada en Base64 en el formulario
        });
      });
    }
  }

  // Convierte un archivo a Base64
  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Envía el formulario al backend
  onSubmit(): void {
    if (this.RegisterForm.valid) {
      const formData = new FormData();
      Object.keys(this.RegisterForm.value).forEach(key => {
        formData.append(key, this.RegisterForm.value[key]);
      });

      this.userService.registerUser(formData)
        .subscribe(
          (data) => {
            // Maneja la respuesta exitosa del backend
            console.log(data);
            this.Router.navigate(['/login']);
          },
          (error: HttpErrorResponse) => {
            // Maneja los errores de la solicitud HTTP
            console.error(error);
            if (error.status === 409) {
              // Correo electrónico, DNI o número de teléfono duplicado
              if (error.error && error.error.message) {
                this.errorMessage = error.error.message;
              } else {
                this.errorMessage = 'El correo electrónico, el DNI o el número de teléfono ya están en uso.';
              }
            } else {
              // Otro tipo de error
              this.errorMessage = 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
    }
  }
}