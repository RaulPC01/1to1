import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {
  isLoggedIn: boolean = false;

  usuarioActual: any; // Supongamos que el objeto de usuario tiene una propiedad 'dni'

  constructor(public TokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    // Obtener información del usuario actual al inicializar el componente
    this.usuarioActual = localStorage.getItem('Idtoken');
  }

  redireccionarAlPerfil(): void {
    const token = this.usuarioActual;
    if (token) {
      // Redirigir al perfil solo si se obtiene un token válido
      this.router.navigate(['/perfil']);
    } else {
      console.error('No se pudo obtener el token de usuario');
    }
  }

  filtrarServicios(categoria: string): void {
    this.router.navigate(['/servicio'], { queryParams: { categoria } });
  }
  logout(): void {
    this.TokenService.cerrarSesion();
  }
}
