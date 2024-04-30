import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';

// Define una función para validar que las dos contraseñas sean iguales
const passwordMatchValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('password_confirmation');

  // Verifica si ambas contraseñas tienen valores y si son iguales
  if (password?.value !== confirmPassword?.value) {
    return { 'passwordMismatch': true };
  }

  return null;
};

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
    private http: HttpClient,
    private userService: UserService
  ) {
    this.RegisterForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    }, {
      // Agrega la validación personalizada al formulario
      validators: passwordMatchValidator
    });
  }

  // Agrega una verificación de nulidad antes de acceder a las propiedades
  onSubmit(): void {
    if (this.RegisterForm.valid) {
      const formData = new FormData();
      const password = this.RegisterForm.get('password');
      const passwordConfirmation = this.RegisterForm.get('password_confirmation');

      // Verifica si las propiedades existen y son válidas
      if (password && passwordConfirmation && password.valid && passwordConfirmation.valid) {
        formData.append('dni', this.RegisterForm.value.dni);
        formData.append('name', this.RegisterForm.value.name);
        formData.append('dateOfBirth', this.RegisterForm.value.dateOfBirth);
        formData.append('email', this.RegisterForm.value.email);
        formData.append('phone', this.RegisterForm.value.phone);
        formData.append('password', password.value);
        formData.append('password_confirmation', passwordConfirmation.value);

        // Realiza la solicitud HTTP con los datos del formulario
        this.userService.registerUser(formData)
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
}
