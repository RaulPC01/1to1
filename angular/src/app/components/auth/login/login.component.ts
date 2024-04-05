import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
    private tokenService: TokenService,
  ) {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { dni, password } = this.loginForm.value;

    this.tokenService.login(this.loginForm.value.dni, this.loginForm.value.password).subscribe({
        next: (dni: string) => {
          // Guarda el DNI del usuario en el servicio de autenticación
          console.log(dni);
          //this.authService.iniciarSesion(response.dni); // Aquí se pasa el DNI al servicio
          // Redirigir a la página principal después del inicio de sesión exitoso
          this.router.navigate(['/principal']);
        },
        error: error => {
          this.errorMessage = 'Hubo un problema al iniciar sesión. Por favor, inténtelo de nuevo.';
        }
    });
  }

  showPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}
