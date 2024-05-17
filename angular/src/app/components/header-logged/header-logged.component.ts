import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {
  isLoggedIn: boolean = false;
  usuarioActual: any;
  showToggleMenu: boolean = false;
  loading: boolean = false;
  buscarPalabra: string = '';
  topRatedServices: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Número de servicios por página

  constructor(
    public TokenService: TokenService, 
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private ServicioService: UserService,
    private translateService: TranslateService,) {  }

  ngOnInit(): void {
    this.usuarioActual = localStorage.getItem('Idtoken');
    this.breakpointObserver.observe([Breakpoints.Handset, '(min-width: 750px)'])
      .pipe(
        map(result => result.matches)
      )
      .subscribe(matches => {
        this.showToggleMenu = !matches;
      });
  }



  cambiarIdioma(idioma: string): void {
    this.translateService.use(idioma); // Cambia el idioma utilizando el servicio de traducción
  }

  redireccionarAlPerfil(): void {
    const token = this.usuarioActual;
    if (token) {
      this.router.navigate(['/perfil']);
    } else {
      console.error('No se pudo obtener el token de usuario');
    }
  }

  logout(): void {
    this.TokenService.cerrarSesion();
    this.router.navigate(['']);
  }

  toggleMobileMenu(): void {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu !== null) {
      mobileMenu.classList.toggle('active');
    }
  }

  closeMobileMenu(): void {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu !== null) {
      mobileMenu.classList.remove('active');
    }
  }
    
}
