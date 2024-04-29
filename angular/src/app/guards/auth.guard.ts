import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.estaAutenticado()) { // Verifica si el usuario está autenticado
      return true; // Permite el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // Bloquea el acceso a la ruta
    }
  }
}
