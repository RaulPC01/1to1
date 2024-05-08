import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private router: Router, private tokenService: TokenService) {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { dni, password } = this.loginForm.value;

    this.tokenService.login(dni, password).subscribe({
      next: (token: string) => {
        // Redirige a la página principal después del inicio de sesión exitoso
        this.router.navigate(['/home-comprador']);
      },
      error: error => {
        this.errorMessage = 'Hubo un problema al iniciar sesión. Por favor, inténtelo de nuevo.';
      }
    });
  }
}
