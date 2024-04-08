import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  usuarioActual: any; // Supongamos que el objeto de usuario tiene una propiedad 'dni'

  constructor(public authService: AuthService, private router: Router) { }

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
}
