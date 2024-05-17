import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {
  isLoggedIn: boolean = false;
  usuarioActual: any;
  showToggleMenu: boolean = false;

  constructor(
    public tokenService: TokenService, 
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    // obtiene el token del usuario actual del almacenamiento local
    this.usuarioActual = localStorage.getItem('Idtoken');
    
    // observa los cambios en los puntos de interrupcion (breakpoints)
    this.breakpointObserver.observe([Breakpoints.Handset, '(min-width: 750px)'])
      .pipe(
        map(result => result.matches)
      )
      .subscribe(matches => {
        // muestra u oculta el menu de alternancia segun el tamaño de la pantalla
        this.showToggleMenu = !matches;
      });
  }

  redireccionarAlPerfil(): void {
    const token = this.usuarioActual;
    if (token) {
      // redirige al usuario a la pagina de perfil si el token esta disponible
      this.router.navigate(['/perfil']);
    } else {
      console.error('no se pudo obtener el token de usuario');
    }
  }

  logout(): void {
    // cierra la sesion del usuario y redirige a la pagina de inicio
    this.tokenService.cerrarSesion();
    this.router.navigate(['']);
  }

  toggleMobileMenu(): void {
    // alterna la visibilidad del menu movil
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu !== null) {
      mobileMenu.classList.toggle('active');
    }
  }

  closeMobileMenu(): void {
    // cierra el menu movil si esta abierto
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu !== null) {
      mobileMenu.classList.remove('active');
    }
  }
}
