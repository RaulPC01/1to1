import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private tokenService: TokenService,
    private translateService: TranslateService
  ) {
    // inicializa el formulario con validaciones
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { dni, password } = this.loginForm.value;

    // llama al servicio de login
    this.tokenService.login(dni, password).subscribe({
      next: (token: string) => {
        // redirige a la pagina principal despues del inicio de sesion exitoso
        this.router.navigate(['/home-comprador']);
      },
      error: error => {
        // obtiene el mensaje de error traducido y lo asigna a errorMessage
        this.translateService.get('login.error_message').subscribe((translation: string) => {
          this.errorMessage = translation;
        });
      }
    });
  }
}
